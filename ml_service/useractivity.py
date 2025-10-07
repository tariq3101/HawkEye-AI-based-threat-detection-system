# ml_service/useractivity.py
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import MinMaxScaler

def analyze_user_activity():
    """
    Returns top 10 user activities with risk scores.
    """
    df = pd.read_csv("insider_threat_detection.csv")

    # --- Numeric preprocessing ---
    numeric = df.select_dtypes(include=['float64', 'int64']).fillna(0)
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(numeric)

    # --- Anomaly Detection ---
    iso = IsolationForest(contamination=0.1, random_state=42)
    df["is_threat"] = iso.fit_predict(scaled)
    df["risk_score"] = iso.decision_function(scaled)
    df["risk_level"] = np.where(df["is_threat"] == -1, "High", "Low")

    # --- Identify user column ---
    possible_user_cols = ["User", "user", "username", "actor", "employee"]
    user_col = next((col for col in possible_user_cols if col in df.columns), None)

    # --- Prepare activity data ---
    if user_col and "activity" in df.columns:
        activity_df = df[[user_col, "activity", "risk_score", "risk_level",
                          "location" if "location" in df.columns else None,
                          "device" if "device" in df.columns else None,
                          "timestamp" if "timestamp" in df.columns else None
                         ]].head(10)  # top 10
        # Rename columns to match frontend expectation
        activity_df = activity_df.rename(columns={
            user_col: "user",
            "activity": "activity",
            "risk_score": "riskScore",
            "risk_level": "risk_level",
        })
        # Fill missing columns with default empty string
        for col in ["location", "device", "timestamp"]:
            if col not in activity_df.columns:
                activity_df[col] = ""
        top_activities = activity_df.to_dict(orient="records")
    else:
        # fallback if activity/user columns missing
        top_activities = []

    return top_activities
