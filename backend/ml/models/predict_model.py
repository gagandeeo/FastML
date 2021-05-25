import joblib
from pathlib import Path
import numpy as np

BASE_DIR = Path(__file__).resolve(strict=True).parents[2]


def predict(jblib_path=None, x_data=None):
    if(jblib_path != None):
        model_instance = joblib.load(Path.joinpath(BASE_DIR, jblib_path))
        x_data = np.array(x_data)
        print(x_data.reshape(1, -1))
        result = model_instance.predict(x_data.reshape(1, -1))
        return result
    else:
        return "No Model Found!!"
