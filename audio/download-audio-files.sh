basepath=`dirname $(realpath $0)`

mp3TaskFile=$basepath/tasks/task-mp3-$1.json
marksTaskFile=$basepath/tasks/task-marks-$1.json


httpMp3Url=$(jq -r ".SynthesisTask.OutputUri" $mp3TaskFile)
httpMarksUrl=$(jq -r ".SynthesisTask.OutputUri" $marksTaskFile)

mp3Path=$(echo $httpMp3Url | sed 's/https:\/\/s3.eu-west-1.amazonaws.com\//s3:\/\//g')
marksPath=$(echo $httpMarksUrl | sed 's/https:\/\/s3.eu-west-1.amazonaws.com\//s3:\/\//g')

echo $mp3Path
echo $marksPath

aws s3 cp $mp3Path $basepath/mp3/$1.mp3
aws s3 cp $marksPath $basepath/marks/$1.jsonl

jq -s '.' $basepath/marks/$1.jsonl > $basepath/marks/$1.json

rm -rf $basepath/marks/$1.jsonl
