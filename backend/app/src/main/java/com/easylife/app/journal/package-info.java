@org.springframework.modulith.ApplicationModule(
        displayName = "Journal",
        allowedDependencies = {
                "users::api",
                "categories::api",
                "shared"
        })
package com.easylife.app.journal;