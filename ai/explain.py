from ai.groq_client import get_groq_client

def generate_explanation(features: dict, score: float) -> dict:
    # Skip AI for low-risk wallets
    if score < 0.3:
        return {
            "explanation": "No significant Sybil behavior detected.",
            "confidence": "LOW"
        }

    prompt = f"""
You are a blockchain security analyst.

Signals:
- Creation time similarity: {features['creation_time_similarity']}
- Transaction overlap: {features['tx_pattern_overlap']}
- Interaction entropy: {features['interaction_entropy']}

Explain why this wallet may be Sybil.
Use at most 2 sentences.
"""

    client = get_groq_client()

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=80,
    )

    explanation = response.choices[0].message.content.strip()

    return {
        "explanation": explanation,
        "confidence": "HIGH" if score > 0.7 else "MEDIUM"
    }
