import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve(strict=True).parents[1]


class PrepareData:
    def __init__(self, data=None, drop=True):
        self.data = Path.joinpath(BASE_DIR, data)
        self.drop = drop

    def prepare(self):
        df = pd.read_csv(self.data)
        if(self.drop):
            df.drop(df.index[130:], inplace=True)
        """ saving to_csv asynchronously """
        df.to_csv(self.data)
        # return df
