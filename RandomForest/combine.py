import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.calibration import label_binarize
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder, MinMaxScaler
from sklearn.impute import SimpleImputer
from sklearn.metrics import (ConfusionMatrixDisplay, accuracy_score, confusion_matrix, 
                             precision_score, recall_score, f1_score, roc_auc_score, 
                             classification_report, roc_curve, auc, mean_absolute_error, 
                             mean_squared_error, r2_score)
import joblib

# Load and clean the dataset
data = pd.read_csv('C:\\Users\\ACER\\Downloads\\attack csv\\attack csv\\type3.csv')

# Corrected column names based on your dataset
severity_features = [
    'Flow Duration', 
    'Total Length of Fwd Packets', 
    'Total Length of Bwd Packets', 
    'Flow Bytes/s', 
    'Flow Packets/s', 
    'SYNFlag Count', 
    'RSTFlag Count', 
    'ACK Flag Count', 
    'URG Flag Count'
]

# Print the column names to verify
print("Columns in the dataset:", data.columns)

# Remove any leading/trailing spaces from column names
data.columns = data.columns.str.strip()

# Verify the updated column names
print("Updated columns in the dataset:", data.columns)

# Check for missing values in the specified columns
print("Missing values in severity features:", data[severity_features].isnull().sum())

# Check data types of the specified columns
print("Data types of severity features:", data[severity_features].dtypes)

# Impute missing values with the mean
imputer = SimpleImputer(strategy='mean')
data[severity_features] = imputer.fit_transform(data[severity_features])

# Normalize the selected features
scaler = MinMaxScaler()
data[severity_features] = scaler.fit_transform(data[severity_features])

# Assign weights to each feature (example weights)
weights = {
    'Flow Duration': 0.2,
    'Total Length of Fwd Packets': 0.2,
    'Total Length of Bwd Packets': 0.2,
    'Flow Bytes/s': 0.1,
    'Flow Packets/s': 0.1,
    'SYNFlag Count': 0.05,
    'RSTFlag Count': 0.05,
    'ACK Flag Count': 0.05,
    'URG Flag Count': 0.05
}

# Calculate the composite severity score
data['Severity Score'] = sum(data[feature] * weight for feature, weight in weights.items())

# Separate features and target
X = data.drop(['label', 'Severity Score'], axis=1).values
y_class = data['label'].values
y_reg = data['Severity Score'].values

# Encode dependent variable
le = LabelEncoder()
y_class = le.fit_transform(y_class)

# Split data into training and testing sets
X_train, X_test, y_class_train, y_class_test, y_reg_train, y_reg_test = train_test_split(
    X, y_class, y_reg, test_size=0.2, random_state=42
)

# Feature Scaling
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Initialize and train the Random Forest Classifier
clf = RandomForestClassifier(n_estimators=100, criterion='entropy', random_state=42)
clf.fit(X_train, y_class_train)

# Save the trained model
joblib.dump(clf, 'random_forest_model.pkl')

# Save the StandardScaler
joblib.dump(sc, 'standard_scaler.pkl')

# Make predictions
y_class_pred = clf.predict(X_test)

# Evaluate the classification model
accuracy = accuracy_score(y_class_test, y_class_pred)
precision = precision_score(y_class_test, y_class_pred, average='weighted')
recall = recall_score(y_class_test, y_class_pred, average='weighted')
f1 = f1_score(y_class_test, y_class_pred, average='weighted')

# Calculate macro-averaged and micro-averaged ROC-AUC
n_classes = len(np.unique(y_class))
y_class_test_bin = label_binarize(y_class_test, classes=np.unique(y_class))
y_class_score = clf.predict_proba(X_test)

fpr = dict()
tpr = dict()
roc_auc = dict()

for i in range(n_classes):
    fpr[i], tpr[i], _ = roc_curve(y_class_test_bin[:, i], y_class_score[:, i])
    roc_auc[i] = auc(fpr[i], tpr[i])

# Aggregate all false positive rates
all_fpr = np.unique(np.concatenate([fpr[i] for i in range(n_classes)]))

# Interpolate all ROC curves at these points
mean_tpr = np.zeros_like(all_fpr)
for i in range(n_classes):
    mean_tpr += np.interp(all_fpr, fpr[i], tpr[i])

# Average it and compute AUC
mean_tpr /= n_classes

fpr["macro"] = all_fpr
tpr["macro"] = mean_tpr
roc_auc["macro"] = auc(fpr["macro"], tpr["macro"])

# Micro-averaged ROC-AUC
fpr["micro"], tpr["micro"], _ = roc_curve(y_class_test_bin.ravel(), y_class_score.ravel())
roc_auc["micro"] = auc(fpr["micro"], tpr["micro"])

print(f"Classification Metrics:")
print(f"Accuracy: {accuracy}")
print(f"Precision: {precision}")
print(f"Recall: {recall}")
print(f"F1-Score: {f1}")
print(f"Macro-Averaged ROC-AUC: {roc_auc['macro']}")
print(f"Micro-Averaged ROC-AUC: {roc_auc['micro']}")

# Classification report
print("\nClassification Report:")
print(classification_report(y_class_test, y_class_pred))

# Generate and visualize the Confusion Matrix
cm = confusion_matrix(y_class_test, y_class_pred)
labels = np.unique(y_class_test)  # Extract unique labels from the test set

disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=labels)

import matplotlib
matplotlib.use('Agg')  # Use Agg backend

# Proceed with the plot as usual
disp.plot(cmap="Blues", values_format="d")
plt.title("Confusion Matrix for Cyber Threat Detection")
plt.xlabel("Predicted Labels")
plt.ylabel("True Labels")
plt.savefig("C:/Users/ACER/Desktop/confusion_matrix.png")  # Save the plot to a file

# Initialize and train the Random Forest Regressor
reg = RandomForestRegressor(n_estimators=100, random_state=42)
reg.fit(X_train, y_reg_train)

# Make predictions
y_reg_pred = reg.predict(X_test)

# Evaluate the regression model
mae = mean_absolute_error(y_reg_test, y_reg_pred)
mse = mean_squared_error(y_reg_test, y_reg_pred)
r2 = r2_score(y_reg_test, y_reg_pred)

print(f"\nRegression Metrics:")
print(f"Mean Absolute Error (MAE): {mae}")
print(f"Mean Squared Error (MSE): {mse}")
print(f"R-squared (R²): {r2}")