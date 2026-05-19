package routes

import (
	"net/http"
	"ngochain-backend/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api/v1")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "NGOChain API is running"})
		})
		
		// Auth Routes
		api.POST("/auth/register", handlers.RegisterUser)
		api.POST("/auth/login", handlers.LoginUser)

		// NGO Routes
		api.GET("/ngos", handlers.GetNGOs)
		api.POST("/ngos", handlers.RegisterNGO)

		// Donation & Transaction Routes
		api.GET("/donations", handlers.GetDonations)
		api.POST("/donations", handlers.RecordDonation)

		// Volunteer Routes
		api.GET("/volunteers", handlers.GetVolunteers)
		api.POST("/volunteers", handlers.RegisterVolunteer)

		// Analytics Dashboard
		api.GET("/analytics", handlers.GetAnalytics)
	}
}
