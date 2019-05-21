#!groovy

@Library('blockr-jenkins-rendezvous') _

String repo = 'blockr-p2p-rendezvous'

Map settings = [
    sonar_key: 'blockr-p2p-rendezvous',
    source_folder: 'src/',
    archive_folder: ['dist/'],
    skip_tests: true
]

tsBuildAndPublish(repo, settings)