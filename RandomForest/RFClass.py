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

# Load and clean the dataset
data = pd.read_csv('type2.csv')


# Separate features and target
X = data.iloc[:, :-1].values
y = data.iloc[:, -1].values

# Encode dependent variable
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature Scaling
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Initialize and train the Random Forest Classifier
clf = RandomForestClassifier(n_estimators=100, criterion='entropy', random_state=42)
clf.fit(X_train, y_train)

# Save the trained model
joblib.dump(clf, 'random_forest_model.pkl')

# Save the StandardScaler
joblib.dump(sc, 'standard_scaler.pkl')

# Make predictions
y_pred = clf.predict(X_test)

# Evaluate the classification model
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

# Calculate macro-averaged and micro-averaged ROC-AUC
n_classes = len(np.unique(y))
y_test_bin = label_binarize(y_test, classes=np.unique(y))
y_score = clf.predict_proba(X_test)

fpr = dict()
tpr = dict()
roc_auc = dict()

for i in range(n_classes):
    fpr[i], tpr[i], _ = roc_curve(y_test_bin[:, i], y_score[:, i])
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
fpr["micro"], tpr["micro"], _ = roc_curve(y_test_bin.ravel(), y_score.ravel())
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
print(classification_report(y_test, y_pred))

# Generate and visualize the Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
labels = np.unique(y_test)  # Extract unique labels from the test set

disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=labels)

import matplotlib
matplotlib.use('Agg')  # Use Agg backend

# Proceed with the plot as usual
disp.plot(cmap="Blues", values_format="d")
plt.title("Confusion Matrix for Cyber Threat Detection")
plt.xlabel("Predicted Labels")
plt.ylabel("True Labels")
plt.savefig("C:/Users/ACER/Desktop/confusion_matrix.png")  # Save the plot to a file
