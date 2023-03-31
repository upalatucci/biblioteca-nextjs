basepath=`dirname $(realpath $0)`

post_input=$basepath/post_input.json

curl https://biblioteca-wp.sgi-italia.org/wp-json/wp/v2/rsnd?page=$1 -o $post_input


for i in $(jq -r ".[] | .slug" $post_input)
  do
    $basepath/load-post.sh $i
    $basepath/generate-audio.sh $i
  done