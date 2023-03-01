basepath=`dirname $(realpath $0)`

postpath=$basepath/posts/$1.json
ssmlpath=$basepath/ssml/$1.xml
curl https://biblioteca.sgi-italia.org/wp-json/wp/v2/rsnd?slug=$1 -o $postpath
echo $postpath
echo $ssmlpath

title=$(jq ".[0].title.rendered" $postpath)
content=$(jq ".[0].content.rendered" $postpath)

echo "<speak><mark name='title'/> $title $content</speak>" > $ssmlpath

sed -i 's/<em>//g' $ssmlpath
sed -i 's/<\/em>//g' $ssmlpath

sed -i 's/<sup>.*<\/sup>//g' $ssmlpath
sed -i 's/Nichiren/Níchiren/g' $ssmlpath

awk '/<p>/{ print "<mark name=\"paragraph-" ++i "\" />" } 1' $ssmlpath > $ssmlpath.tmp && mv $ssmlpath.tmp $ssmlpath