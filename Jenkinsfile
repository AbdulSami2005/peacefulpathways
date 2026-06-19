pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs('Node_latest') { 
                    // Installs Vite and project dependencies, then builds the production files
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                // Verifies that Vite successfully compiled the distribution folder
                bat '''
                if exist dist\\index.html (
                    echo Build Successful
                ) else (
                    echo Dist folder not found
                    dir
                    exit /b 1
                )
                '''
            }
        }

        stage('Deliver') {
            steps {
                // Safely handles refreshing the running app container
                bat 'docker stop meditation-app || exit 0'
                bat 'docker rm meditation-app || exit 0'
                
                // Builds your app container and serves it on port 3001
                bat 'docker build -t peaceful-pathways-app .'
                bat 'docker run -d --name meditation-app -p 3001:80 peaceful-pathways-app'
            }
        }
    }
}