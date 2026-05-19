package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type NGO struct {
	ID                   primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name                 string             `bson:"name" json:"name"`
	Type                 string             `bson:"type" json:"type"`
	RegistrationNumber   string             `bson:"registrationNumber" json:"registrationNumber"`
	WalletAddress        string             `bson:"walletAddress" json:"walletAddress"`
	BankAccount          string             `bson:"bankAccount" json:"bankAccount"`
	IFSCCode             string             `bson:"ifscCode" json:"ifscCode"`
	SmartContractAddress string             `bson:"smartContractAddress" json:"smartContractAddress"`
	Address              string             `bson:"address" json:"address"`
	Contact              string             `bson:"contact" json:"contact"`
	Description          string             `bson:"description" json:"description"`
	IsVerified           bool               `bson:"isVerified" json:"isVerified"`
	TotalDonations       float64            `bson:"totalDonations" json:"totalDonations"`
	CreatedAt            time.Time          `bson:"createdAt" json:"createdAt"`
}

type User struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name          string             `bson:"name" json:"name"`
	Email         string             `bson:"email" json:"email"`
	PasswordHash  string             `bson:"passwordHash" json:"-"`
	Role          string             `bson:"role" json:"role"` // User, NGO, Admin
	WalletAddress string             `bson:"walletAddress" json:"walletAddress"`
	CreatedAt     time.Time          `bson:"createdAt" json:"createdAt"`
}

type DonationRecord struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Donor     string             `bson:"donor" json:"donor"`
	NGOWallet string             `bson:"ngoWallet" json:"ngoWallet"`
	Amount    string             `bson:"amount" json:"amount"`
	Cause     string             `bson:"cause" json:"cause"`
	TxHash    string             `bson:"txHash" json:"txHash"`
	Timestamp time.Time          `bson:"timestamp" json:"timestamp"`
}

type Volunteer struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name         string             `bson:"name" json:"name"`
	Email        string             `bson:"email" json:"email"`
	Phone        string             `bson:"phone" json:"phone"`
	InterestArea string             `bson:"interestArea" json:"interestArea"`
	CreatedAt    time.Time          `bson:"createdAt" json:"createdAt"`
}
