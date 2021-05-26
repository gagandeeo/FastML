import joblib
from pathlib import Path
import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
BASE_DIR = Path(__file__).resolve(strict=True).parents[2]


def predict(pred_path, jblib_path=None):
    if(jblib_path != None and pred_path != None):
        model_instance = joblib.load(Path.joinpath(BASE_DIR, jblib_path))
        data_path = Path.joinpath(BASE_DIR, pred_path)
        pred_df = pd.read_csv(data_path)
        # print(pred_df)
        # x_data = np.array(x_data)
        X_val = pred_df[['Sepal_length', 'Sepal_width',
                         'Petal_length', 'Petal_width']]
        # print(x_data.reshape(1, -1))
        if(len(X_val) != 1):
            pipe = Pipeline(model_instance.steps[1:])
            result = pipe.predict(X_val.to_numpy())
        else:
            pipe = Pipeline(model_instance.steps[1:])
            result = pipe.predict(
                X_val.to_numpy()[0].reshape(1, -1))

        pred_df['result'] = model_instance['encoder'].inverse_transform(
            result.reshape(-1, 1))
        # print(model_instance['encoder'].inverse_transform(
        #     result.reshape(-1, 1)))
        # print(model_instance.steps[0][0])
        pred_df.to_csv(data_path)
        # print(pred_df)
        return pred_path
    else:
        return "No Model Found!!"
