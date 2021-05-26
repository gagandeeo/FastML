from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor, RandomForestClassifier, RandomForestRegressor
from sklearn.cluster import KMeans
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC, SVR
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder
from sklearn import impute
from sklearn import metrics
from sklearn import preprocessing
from sklearn.pipeline import Pipeline
from sklearn import model_selection
import joblib
import time
import numpy as np


BASE_DIR = Path(__file__).resolve(strict=True).parents[2]


class TrainModel:

    def __init__(self, data=None, targets=None, model_name=None, model_type=None):
        self.df = pd.read_csv(Path.joinpath(BASE_DIR, data))
        self.model_name = model_name
        self.model_type = model_type
        self.model_instance = None
        self.X = None
        self.y = None
        self.pipeline_instance = Pipeline(
            [('imputer', impute.SimpleImputer())]
        )
        self.targets = targets

    def plot_roc_curve(self, X_train, y_train, n_class):
        fpr = np.zeros((n_class, n_class))
        tpr = np.zeros((n_class, n_class))
        thresh = np.zeros((n_class, n_class))
        y_pred = model_selection.cross_val_predict(
            self.model_instance, X_train, y_train, cv=3, method='predict_proba')

        for i in range(n_class):
            fpr[i], tpr[i], thresh[i] = metrics.roc_curve(
                y_train, y_pred[:, i], pos_label=i)
        return fpr.tolist(), tpr.tolist()

    def plot_learning_curves(self, X_train, y_train, X_val, y_val):
        train_errors, val_errors = [], []
        for m in range(1, len(X_train)):
            self.model_instance.fit(X_train[:m], y_train[:m])
            y_train_predict = self.model_instance.predict(X_train[:m])
            y_val_predict = self.model_instance.predict(X_val)
            train_errors.append(metrics.mean_squared_error(
                y_train[:m], y_train_predict))
            val_errors.append(metrics.mean_squared_error(y_val, y_val_predict))
        return np.sqrt(train_errors).tolist(), np.sqrt(val_errors).tolist()

    def prepare_data(self, dropna=True, imputer=None, encoding=None, scaling=None):

        self.X = self.df[[c for c in self.df.columns if c !=
                          self.targets]].to_numpy()
        self.y = self.df[self.targets].to_numpy().reshape(-1, 1)

        if (imputer not in ["string", "", None]):
            self.imputer_instance = eval(
                f"impute.{imputer}(strategy='most_frequent')")
            self.X = self.imputer_instance.fit_transform(self.X)
            self.pipeline_instance.steps.append(
                ['imputer', self.imputer_instance])
        else:
            self.df.drop(self.df.index[130:], inplace=True)

        if(encoding not in ["string", "", None]):
            encoder_instance = eval(f"preprocessing.{encoding}()")
            self.y = encoder_instance.fit_transform(self.y)
        if(scaling not in ["string", "", None]):
            self.scaler_instance = eval(f"preprocessing.{scaling}()")
            self.X = self.scaler_instance.fit_transform(self.X)
            self.pipeline_instance.steps.append(
                ['scaler', self.scaler_instance])

    def train(self, hyperparams, test_size=0.25):
        class_metric = {}
        X_train, X_test, y_train, y_test = train_test_split(
            self.X, self.y.ravel(), test_size=test_size, random_state=42)
        self.model_instance = eval(f"{self.model_name}()")
        if bool(hyperparams):
            self.model_instance.set_params(**hyperparams)
        self.model_instance.fit(X_train, y_train)
        self.pipeline_instance.steps.append(
            ['model', self.model_instance])
        self.pipeline_instance.steps.pop(0)
        y_pred = self.model_instance.predict(X_test)
        if (self.model_type == 1):
            y_train_pred = self.model_instance.predict(X_train)
            conf_matrix = metrics.confusion_matrix(
                y_train, y_train_pred).tolist()
            fpr, tpr = self.plot_roc_curve(X_train, y_train, 3)
            class_metric = {
                'type': 1,
                'report': metrics.classification_report(
                    y_test, y_pred, output_dict=True)['weighted avg'],
                'misc': {
                    'conf_matrix': conf_matrix,
                    'roc_curve': {
                        "fpr": fpr,
                        "tpr": tpr,
                    }
                }
            }
        elif(self.model_type == 0):
            expl_var = metrics.explained_variance_score(y_test, y_pred)
            mean_abs = metrics.mean_absolute_error(y_test, y_pred)
            mean_sqr = metrics.mean_squared_error(y_test, y_pred)
            train_error, val_error = self.plot_learning_curves(
                X_train, y_train, X_test, y_test)
            class_metric = {
                'type': 0,
                'report': {
                    'expl_var': expl_var,
                    'mean_abs': mean_abs,
                    'mean_sqr': mean_sqr
                },
                'misc': {
                    'learning_curve': {
                        'train_err': train_error,
                        'val_err': val_error
                    }
                }
            }

        jblib_path = f"static/joblibs_models/{time.time()}.joblib"
        joblib.dump(self.pipeline_instance,
                    Path.joinpath(BASE_DIR, jblib_path), compress=True)
        return class_metric, jblib_path
