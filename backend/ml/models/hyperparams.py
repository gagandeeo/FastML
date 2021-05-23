from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeClassifier
from sqlalchemy.sql.expression import null


def get_params(model_name):
    try:
        param = eval(model_name+"()").get_params()
    except Exception as e:
        return null
    return param
