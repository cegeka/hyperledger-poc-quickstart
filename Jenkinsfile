pipeline {
    agent {
        docker {
            image 'jorisjh/docker-composer-machine'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo docker-compose --version'
            }
        }
    }
}