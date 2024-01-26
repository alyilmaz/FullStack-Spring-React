@groovy.transform.Field
def version

@groovy.transform.Field
def registry

@groovy.transform.Field
def imageName
pipeline {
    agent {
	label 'java-builder'
	}
    stages {
        stage('Prepare') {
            steps {
				sh 'chmod +x gradlew'
                sh 'cat /etc/docker/daemon.json'
                script{
                    version = sh (
                            script: "./gradlew properties -q | grep \"version:\" | awk '{print \$2}'",
                            returnStdout: true
                        ).trim()

                    imageName = sh (
                            script: "./gradlew properties -q | grep \"name:\" | awk '{print \$2}'",
                            returnStdout: true
                        ).trim()
                }
            }
        }	
        stage('Build') {
            steps {
                sh "echo ${version}"
                sh "echo ${env.BRANCH_NAME}"
				sh './gradlew build bootjar -x check'
           
            }
        }       
        stage('Test & Verify') {
            steps {
				sh './gradlew check jacocoTestReport sonarqube'

            }
        }
        stage('Publish Reports ') {
            steps {
                archiveArtifacts artifacts: 'build/reports/tests/test/**/*', fingerprint: true
                archiveArtifacts artifacts: 'build/reports/jacoco/**/*', fingerprint: true
            }
        }                        
    }

}
