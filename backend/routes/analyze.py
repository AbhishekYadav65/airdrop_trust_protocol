from fastapi import APIRouter
from backend.services.policy_engine import bucketize
from backend.services.hash_utils import compute_hash

from ml.scorer import score_wallet
from ai.explain import generate_explanation

router = APIRouter()

@router.post("/analyze")
def analyze(payload: dict):
    wallets = payload["wallets"]
    results = []

    for wallet_id in wallets:
        # Mock wallet data (replace later)
        wallet_data = {
            "creation_time_similarity": 0.8 if wallet_id.endswith("1") else 0.2,
            "tx_pattern_overlap": 0.7 if wallet_id.endswith("1") else 0.3,
            "interaction_entropy": 0.2 if wallet_id.endswith("1") else 0.8,
        }

        # 1. ML scoring
        ml_result = score_wallet(wallet_id, wallet_data)
        score = ml_result["sybil_probability"]
        features = ml_result["features"]

        # 2. Deterministic policy
        bucket = bucketize(score)

        # 3. AI explanation (non-authoritative)
        ai_result = generate_explanation(features, score)

        # 4. Hash commitment
        analysis_hash = compute_hash(
            wallet_id,
            score,
            bucket,
            ai_result["explanation"]
        )

        results.append({
            "wallet": wallet_id,
            "sybil_score": score,
            "bucket": bucket,
            "explanation": ai_result["explanation"],
            "confidence": ai_result["confidence"],
            "model_version": ml_result["model_version"],
            "hash": analysis_hash
        })

    return results
