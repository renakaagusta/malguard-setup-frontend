export const SafeGuardABI = [
    {
      "type": "function",
      "name": "setGuard",
      "inputs": [
        {
          "name": "guard",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "ChangedGuard",
      "inputs": [
        {
          "name": "guard",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    }
  ] as const;