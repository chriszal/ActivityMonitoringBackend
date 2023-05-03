pipeline {
    agent any
    environment {
        REGISTRY_HOST = 'relevium-dev.hua.gr:443'
        REGISTRY_PASSWORD= 'V&DH^gx+o+D(Rf<b+y~joD6NMxm%Ch'
        WEBHOOK_PASSWORD= 'qzl<z@aJF*WnVk*)V`:<S`3&y6FxMH'
        jsonInput='{"image":"relevium-dev.hua.gr:443/falcon-api:v1.0", "database":["mongodb"],"port":["8081"]}'
        

        
    }
    stages {
        stage('Docker Login') {
            steps {
                echo "connecting t local image registry"
                sh 'docker login relevium-dev.hua.gr:443 --username relevium -p ${REGISTRY_PASSWORD}'
            
            }
        }
        stage('create Docker image') {
            steps {
                echo "building docker image version v1.0} ..."
                sh 'docker build -f Dockerfile.api -t relevium-dev.hua.gr:443/falcon-api:v1.0 .'
            
            }
        }
        stage('tag and push Docker image to registry') {
            steps {
                echo "pushing version v1.0 to registry at ${REGISTRY_HOST} ..."
                sh 'docker push relevium-dev.hua.gr:443/falcon-api:v1.0'
               
            }
        }
        stage('deploy Docker container') {
            steps {
                echo "sending request to deploy webhook"
                sh "curl -X POST https://relevium-dev.hua.gr/deploy/ -H 'Content-Type: application/json' --user 'relevium:${WEBHOOK_PASSWORD}' -d '${jsonInput}'"
        }
    }
    }
}