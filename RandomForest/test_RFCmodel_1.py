import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.calibration import label_binarize
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import (ConfusionMatrixDisplay, accuracy_score, confusion_matrix, 
                             precision_score, recall_score, f1_score, roc_auc_score, 
                             classification_report, roc_curve, auc)
import joblib

# Load the saved model
model = joblib.load('random_forest_sample_model.pkl')

# Load the saved StandardScaler
scaler = joblib.load('standard_scaler.pkl')

# Load the new dataset
new_data = pd.read_csv('type4.csv')

# Separate features and target (if target is present in the new dataset)
X_new = new_data.iloc[:, :-1].values
y_new = new_data.iloc[:, -1].values  # Optional: if you have true labels for evaluation

# Ensure y_new is numeric and treat it as a float array
y_new = pd.to_numeric(y_new, errors='coerce').astype(float)

# Check for infinite values in the new dataset
if np.isinf(X_new).any() or np.isinf(y_new).any():
    print("Infinite values detected in the new dataset. Replacing infinite values with NaN.")
    # Replace infinite values with NaN
    X_new[np.isinf(X_new)] = np.nan
    y_new[np.isinf(y_new)] = np.nan

    # Drop rows with NaN values
    new_data = new_data.replace([np.inf, -np.inf], np.nan).dropna()
    X_new = new_data.iloc[:, :-1].values
    y_new = new_data.iloc[:, -1].values

# Encode categorical labels to numeric values
label_encoder = LabelEncoder()
y_new = label_encoder.fit_transform(y_new)

# Apply the same preprocessing steps used during training
X_new_scaled = scaler.transform(X_new)

# Make predictions on the new data
y_new_pred = model.predict(X_new_scaled)

# Ensure the number of samples in y_new and y_new_pred are consistent
if len(y_new) != len(y_new_pred):
    raise ValueError(f"Found input variables with inconsistent numbers of samples: [{len(y_new)}, {len(y_new_pred)}]")

# If you have true labels, you can evaluate the predictions
if 'y_new' in locals():
    accuracy = accuracy_score(y_new, y_new_pred)
    precision = precision_score(y_new, y_new_pred, average='weighted', zero_division=0)
    recall = recall_score(y_new, y_new_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_new, y_new_pred, average='weighted', zero_division=0)

    print(f"Classification Metrics on New Data:")
    print(f"Accuracy: {accuracy}")
    print(f"Precision: {precision}")
    print(f"Recall: {recall}")
    print(f"F1-Score: {f1}")

    # Classification report
    print("\nClassification Report on New Data:")
    print(classification_report(y_new, y_new_pred, zero_division=0))

    # Generate and visualize the Confusion Matrix
    cm = confusion_matrix(y_new, y_new_pred)
    labels = np.unique(y_new)  # Extract unique labels from the new test set

    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=labels)

    import matplotlib
    matplotlib.use('Agg')  # Use Agg backend

    # Proceed with the plot as usual
    disp.plot(cmap="Blues", values_format="d")
    plt.title("Confusion Matrix for New Data")
    plt.xlabel("Predicted Labels")
    plt.ylabel("True Labels")
    plt.savefig("C:/Users/ACER/Desktop/confusion_matrix_type4_data.png")  # Save the plot to a file