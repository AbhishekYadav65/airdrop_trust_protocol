// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TrustRegistry {

    enum RiskBucket { LOW, MEDIUM, HIGH }

    struct TrustRecord {
        RiskBucket bucket;
        bytes32 analysisHash;
        uint256 timestamp;
    }

    mapping(address => TrustRecord) public trust;

    event TrustCommitted(
        address indexed wallet,
        RiskBucket bucket,
        bytes32 analysisHash
    );

    function commitTrust(
        address wallet,
        RiskBucket bucket,
        bytes32 analysisHash
    ) external {
        trust[wallet] = TrustRecord({
            bucket: bucket,
            analysisHash: analysisHash,
            timestamp: block.timestamp
        });

        emit TrustCommitted(wallet, bucket, analysisHash);
    }

    function getTrust(address wallet)
        external
        view
        returns (RiskBucket, bytes32, uint256)
    {
        TrustRecord memory t = trust[wallet];
        return (t.bucket, t.analysisHash, t.timestamp);
    }
}
