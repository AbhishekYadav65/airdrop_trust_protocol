from fastapi import APIRouter

router = APIRouter()

# MOCK TRUST MEMORY
TRUST = {
    "LOW": 100,
    "MEDIUM": 50,
    "HIGH": 10
}

@router.get("/airdrop")
def airdrop():
    demo_wallets = [
        {"wallet": "0xA1", "bucket": "LOW"},
        {"wallet": "0xA2", "bucket": "HIGH"},
        {"wallet": "0xB1", "bucket": "MEDIUM"},
    ]

    result = []
    for w in demo_wallets:
        result.append({
            "wallet": w["wallet"],
            "tokens": TRUST[w["bucket"]]
        })

    return result
