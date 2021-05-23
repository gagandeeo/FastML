from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LinearRegression
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder

BASE_DIR = Path(__file__).resolve(strict=True).parents[2]


class TrainModel:

    def __init__(self, data=None, targets=None, model_name=None):
        self.data = Path.joinpath(BASE_DIR, data)
        self.model_name = model_name
        self.model_instance = None
        self.targets = targets

    def train(self, hyperparams):
        df = pd.read_csv(self.data)
        X = df[[c for c in df.columns if c != self.targets]].to_numpy()
        y = df[self.targets].to_numpy().reshape(-1, 1)
        y = OrdinalEncoder().fit_transform(y)
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.25)
        self.model_instance = eval(self.model_name+"()")
        if bool(hyperparams):
            self.model_instance.set_params(**hyperparams)
        self.model_instance.fit(X_train, y_train)
        score = self.model_instance.score(X_test, y_test)

        return score

# df = pd.read_csv("./housing.csv")
# print(df.head())
