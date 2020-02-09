from __future__ import absolute_import, division, print_function, unicode_literals

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# Helper libraries
import numpy as np
import matplotlib.pyplot as plt

print(tf.__version__)

model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, )),
    keras.layers.Dense(8, activation='leaky_relu'),
    keras.layers.Dense(2, activation='sigmoid')
])