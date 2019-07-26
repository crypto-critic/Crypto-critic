module.exports = {
    bitcoin: {
        //base58Prefixes[EXT_PUBLIC_KEY] = {0x04, 0x88, 0xB2, 0x1E};
        //base58Prefixes[EXT_SECRET_KEY] = {0x04, 0x88, 0xAD, 0xE4};
        version: {private: 0x0488ADE4, public: 0x0488B21E},
        //base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0);
        base58PubPrefix: 0x00,
        //base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);
        base58PrivPrefix: 128,
        coinType: 0,
    },
    litecoin: {
        version: {private: 0x0488ADE4, public: 0x0488B21E},
        base58PubPrefix: 0x30,
        base58PrivPrefix: 176,
        coinType: 2,
    },
    awardcoin: {
        version: {private: 0x0221312B, public: 0x022D2533},
        base58PubPrefix: 0x17,
        base58PrivPrefix: 249,
        coinType: 178,
    },
    twins: {
        version: {private: 0x0221312B, public: 0x022D2533},
        base58PubPrefix: 0x49,
        base58PrivPrefix: 66,
        coinType: 188,
    },
    dash: {
        version: {private: 0x0488ADE4, public: 0x0488B21E},
        base58PubPrefix: 0x4C,
        base58PrivPrefix: 204,
        coinType: 5,
    }
}