// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NGOFund {
    struct NGO {
        address walletAddress;
        string name;
        string ngoType;
        uint256 totalFundsReceived;
        bool isRegistered;
    }

    struct Donation {
        address donor;
        address ngoWallet;
        uint256 amount;
        string cause;
        uint256 timestamp;
    }

    address public admin;
    mapping(address => NGO) public ngos;
    mapping(address => uint256) public balances;
    Donation[] public donations;

    event NGORegistered(address indexed ngoWallet, string name, string ngoType);
    event DonationReceived(address indexed donor, address indexed ngoWallet, uint256 amount, string cause, uint256 timestamp);
    event WithdrawalMade(address indexed ngoWallet, uint256 amount, uint256 timestamp);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerNGO(address _wallet, string memory _name, string memory _ngoType) public {
        require(!ngos[_wallet].isRegistered, "NGO already registered");
        
        ngos[_wallet] = NGO({
            walletAddress: _wallet,
            name: _name,
            ngoType: _ngoType,
            totalFundsReceived: 0,
            isRegistered: true
        });

        emit NGORegistered(_wallet, _name, _ngoType);
    }

    function donate(address _ngoWallet, string memory _cause) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        // Auto register if not already registered to ensure seamless full-stack flow
        if (!ngos[_ngoWallet].isRegistered) {
            ngos[_ngoWallet] = NGO({
                walletAddress: _ngoWallet,
                name: "Verified NGO Partner",
                ngoType: "General",
                totalFundsReceived: 0,
                isRegistered: true
            });
            emit NGORegistered(_ngoWallet, "Verified NGO Partner", "General");
        }

        // Update balances
        balances[_ngoWallet] += msg.value;
        ngos[_ngoWallet].totalFundsReceived += msg.value;

        // Record donation
        donations.push(Donation({
            donor: msg.sender,
            ngoWallet: _ngoWallet,
            amount: msg.value,
            cause: _cause,
            timestamp: block.timestamp
        }));

        emit DonationReceived(msg.sender, _ngoWallet, msg.value, _cause, block.timestamp);
    }

    function withdraw(uint256 amount) public {
        require(ngos[msg.sender].isRegistered, "Caller is not a registered NGO");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit WithdrawalMade(msg.sender, amount, block.timestamp);
    }

    function getBalance(address _wallet) public view returns (uint256) {
        return balances[_wallet];
    }

    function getDonations() public view returns (Donation[] memory) {
        return donations;
    }

    function getNGO(address _wallet) public view returns (string memory, string memory, uint256, bool) {
        NGO memory ngo = ngos[_wallet];
        return (ngo.name, ngo.ngoType, ngo.totalFundsReceived, ngo.isRegistered);
    }
}
