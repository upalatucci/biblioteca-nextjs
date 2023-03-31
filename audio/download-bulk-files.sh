basepath=`dirname $(realpath $0)`

post_input=$basepath/post_input.json

for i in $(jq -r ".[] | .slug" $post_input)
  do
    $basepath/download-audio-files.sh $i
  done