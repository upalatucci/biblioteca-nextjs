basepath=`dirname $(realpath $0)`
filepath=$basepath/ssml/$1.xml


aws polly start-speech-synthesis-task \
 --output-format json \
 --language-code it-IT \
 --voice-id Bianca \
 --text file://$filepath \
 --text-type ssml \
 --engine neural \
 --speech-mark-types ssml \
 --output-s3-bucket-name biblioteca-audio > $basepath/tasks/task-marks-$1.json


aws polly start-speech-synthesis-task \
 --output-format mp3 \
 --language-code it-IT \
 --voice-id Bianca \
 --text file://$filepath \
 --text-type ssml \
 --engine neural \
 --output-s3-bucket-name biblioteca-audio > $basepath/tasks/task-mp3-$1.json