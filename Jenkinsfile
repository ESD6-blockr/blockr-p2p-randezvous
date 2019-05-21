#!groovy

@Library('blockr-jenkins-lib') _

String repo = 'blockr-p2p-rendezvous'

Map settings = [
    sonar_key: 'blockr-p2p-rendezvous',
    source_folder: 'src/',
    archive_folder: ['dist/']
]

tsBuildAndPublish(repo, settings)