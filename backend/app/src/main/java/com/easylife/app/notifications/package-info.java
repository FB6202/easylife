@org.springframework.modulith.ApplicationModule(
        displayName = "Notifications",
        allowedDependencies = {
                "users",
                "todos",
                "goals",
                "calendar",
                "documents",
                "contacts",
                "shared"
        })

package com.easylife.app.notifications;