from fastapi import APIRouter
from services.policy_engine import bucketize
from services.hash_utils import compute_hash
from ml.scorer import score_wallet
from ai.explain import explain_wallet

router = APIRouter()

@router.post("/analyze")
def analyze(payload: dict):
    wallets = payload["wallets"]
    results = []

    for w in wallets:
        score = score_wallet(w)
        bucket = bucketize(score)
        explanation = explain_wallet(w, score)

        analysis_hash = compute_hash(w, score, bucket, explanation)

        results.append({
            "wallet": w,
            "sybil_score": score,
            "bucket": bucket,
            "explanation": explanation,
            "hash": analysis_hash
        })

    return results
