# ml_service/dashboard.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import IsolationForest
from sklearn.cluster import KMeans

def analyze_dashboard():
    """
    Performs ML analysis for the Dashboard page.
    Uses 'activity' column from dataset for threat distribution.
    Risk levels are derived from the dataset's 'riskScore' column.
    """
    df = pd.read_csv("insider_threat_detection.csv")

    # --- 1. Numeric preprocessing for ML ---
    numeric = df.select_dtypes(include=['float64', 'int64']).fillna(0)
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(numeric)

    # --- 2. Optional: Anomaly Detection (Isolation Forest) ---
    # This is separate from dataset's riskScore, just for additional insights
    iso = IsolationForest(contamination=0.1, random_state=42)
    df["is_anomaly"] = iso.fit_predict(scaled)  # -1 anomaly, 1 normal
    df["anomaly_score"] = -iso.decision_function(scaled)  # higher = more anomalous

    # --- 3. Clustering (K-Means) ---
    kmeans = KMeans(n_clusters=3, random_state=42)
    df["cluster"] = kmeans.fit_predict(scaled)

    # --- 4. Compute risk_level from existing 'riskScore' column ---
    if "riskScore" in df.columns:
        # Define thresholds for Low / Medium / High
        df["risk_level"] = pd.cut(
            df["riskScore"],
            bins=[-np.inf, 3, 6, np.inf],  # adjust thresholds based on your data
            labels=["Low", "Medium", "High"]
        ).astype(str)
    else:
        # Fallback if riskScore missing: use anomaly
        df["risk_level"] = np.where(df["is_anomaly"] == -1, "High", "Low")

    # --- 5. Threat Distribution (by 'activity' column) ---
    activity_counts = df["activity"].value_counts().head(10).to_dict() if "activity" in df.columns else {"Unknown": len(df)}

    # --- 6. Recent Alerts ---
    possible_user_cols = ["User", "user", "username", "actor", "employee"]
    user_col = next((col for col in possible_user_cols if col in df.columns), None)

    if user_col and "activity" in df.columns:
        recent_alerts = df[[user_col, "activity", "risk_level"]].head(10).rename(
            columns={user_col: "User", "activity": "EventType"}
        ).to_dict(orient="records")
    elif "activity" in df.columns:
        recent_alerts = df[["activity", "risk_level"]].head(10).rename(
            columns={"activity": "EventType"}
        ).to_dict(orient="records")
    else:
        recent_alerts = df[["risk_level"]].head(10).to_dict(orient="records")

    # --- 7. Aggregates ---
    cluster_counts = df["cluster"].value_counts().to_dict()
    risk_counts = df["risk_level"].value_counts().to_dict()

    # --- 8. Risk Trend data ---
    step = max(1, len(df) // 6)
    risk_trends = [
        {
            "time": i,
            "highRisk": int((df.iloc[:i]["risk_level"] == "High").sum()),
            "mediumRisk": int((df.iloc[:i]["risk_level"] == "Medium").sum()),
            "lowRisk": int((df.iloc[:i]["risk_level"] == "Low").sum()),
        }
        for i in range(0, len(df), step)
    ]

    # --- 9. Final dashboard response ---
    result = {
        "summary": {
            "total_records": len(df),
            "high_risk": int((df["risk_level"] == "High").sum()),
            "medium_risk": int((df["risk_level"] == "Medium").sum()),
            "low_risk": int((df["risk_level"] == "Low").sum()),
            "clusters": cluster_counts,
        },
        "risk_trends": risk_trends,
        "recent_alerts": recent_alerts,
        "threat_distribution": [{"name": k, "value": v} for k, v in activity_counts.items()],
    }

    return result
