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
from sklearn import preprocessing
import joblib
import time

BASE_DIR = Path(__file__).resolve(strict=True).parents[2]


class TrainModel:

    def __init__(self, data=None, targets=None, model_name=None):
        self.df = pd.read_csv(Path.joinpath(BASE_DIR, data))
        self.model_name = model_name
        self.model_instance = None
        self.X = None
        self.y = None
        self.targets = targets

    def prepare_data(self, dropna=True, imputer=None,  encoding=None, scaling=None):
        # df = pd.read_csv(self.data)
        if (imputer != "string"):
            imputer_instance = eval(f"impute.{imputer}()")
        else:
            self.df.drop(self.df.index[130:], inplace=True)

        self.X = self.df[[c for c in self.df.columns if c !=
                          self.targets]].to_numpy()
        self.y = self.df[self.targets].to_numpy().reshape(-1, 1)

        if(encoding != "string"):
            encoder_instance = eval(f"preprocessing.{encoding}()")
            self.y = encoder_instance.fit_transform(self.y)
        if(scaling != "string"):
            scaler_instance = eval(f"preprocessing.{scaling}()")
            self.X = scaler_instance.fit_transform(self.X)

    def train(self, hyperparams, test_size=0.25):
        X_train, X_test, y_train, y_test = train_test_split(
            self.X, self.y.ravel(), test_size=test_size)
        self.model_instance = eval(f"{self.model_name}()")
        if bool(hyperparams):
            self.model_instance.set_params(**hyperparams)
        self.model_instance.fit(X_train, y_train)
        score = self.model_instance.score(X_test, y_test)
        jblib_path = f"static/joblibs_models/{time.time()}.joblib"
        joblib.dump(self.model_instance, Path.joinpath(BASE_DIR, jblib_path))
        return score, jblib_path

# df = pd.read_csv("./housing.csv")
# print(df.head())
