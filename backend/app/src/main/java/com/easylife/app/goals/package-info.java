@org.springframework.modulith.ApplicationModule(
        displayName = "Goals",
        allowedDependencies = {
                "users::api",
                "categories::api",
                "shared"
        })
package com.easylife.app.goals;