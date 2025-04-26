import pandas as pd
from sklearn.calibration import LabelEncoder
from sklearn.metrics import r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.impute import SimpleImputer

# Corrected column names based on your dataset
severity_features = [
    'Flow Duration', 
    'Total Fwd Packets',
    'Total Bwd Packets',
    'Total Length of Fwd Packets', 
    'Total Length of Bwd Packets', 
    'Fwd Packet Length Mean',
    'Bwd Packet Length Mean'
    'Flow Bytes/s', 
    'Flow Packets/s', 
    ]

data = pd.read_csv('C:\\Users\\ACER\\Downloads\\type2 - Copy.csv')

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
    'Flow Duration': 0.25,
    'Total Fwd Packets': 0.20,
    'Total Bwd Packets': 0.20,
    'Total Length of Fwd Packets': 0.15,
    'Total Length of Bwd Packets': 0.15,
    'Fwd Packet Length Mean': 0.10,
    'Bwd Packet Length Mean': 0.10,
    'Flow Bytes/s': 0.15,
    'Flow Packets/s': 0.10,
    }

# Encode dependent variable 
label_encoder = LabelEncoder()
data['Label'] = label_encoder.fit_transform(data['Label'])

# Calculate the composite severity score
data['Severity Score'] = sum(data[feature] * weight for feature, weight in weights.items())

# Split the data into training and testing sets for regression
X_train_sev, X_test_sev, y_train_sev, y_test_sev = train_test_split(X_severity, y_severity, test_size=0.2, random_state=42)

# Initialize the Random Forest Regressor
reg = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model
reg.fit(X_train_sev, y_train_sev)

# Make predictions
y_pred_sev = reg.predict(X_test_sev)

# Print the severity scores
print(f"Severity Score: data{data['Severity Score']}")
