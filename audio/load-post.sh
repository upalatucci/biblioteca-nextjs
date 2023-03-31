basepath=`dirname $(realpath $0)`

postpath=$basepath/posts/$1.json
ssmlpath=$basepath/ssml/$1.xml
curl https://biblioteca-wp.sgi-italia.org/wp-json/wp/v2/rsnd?slug=$1 -o $postpath
echo $postpath
echo $ssmlpath

title=$(jq ".[0].title.rendered" $postpath)
content=$(jq ".[0].content.rendered" $postpath)
cenni_storici=$(jq -r  ".[0].acf.acf_cenni_storici" $postpath  2> /dev/null)

content=$(echo "$content" | sed -e 's/<li>/<p>/g')
content=$(echo "$content" | sed -e 's/<\/li>/<\/p>/g')
content=$(echo "$content" | sed -e 's/<[^p][^/p][^>]*>//g')

if [ "$cenni_storici" = "" ];
then
echo "<speak><mark name='title'/> $title <mark name='content'/> $content </speak>" > $ssmlpath
else
echo "<speak><mark name='title'/> $title <mark name='content'/> $content  <mark name='cenni_storici'/> <p>Cenni storici</p> $cenni_storici </speak>" > $ssmlpath
fi

sed -i 's/<em>//g' $ssmlpath
sed -i 's/<\/em>//g' $ssmlpath

sed -i 's/<sup>.*<\/sup>//g' $ssmlpath
sed -i "s/Nichiren/<phoneme alphabet=\"ipa\" ph=\"'ni̯tʃiren\">Nichiren<\/phoneme>/g" $ssmlpath
sed -i "s/Daishonin/<phoneme alphabet=\"ipa\" ph=\"dai̯ʃʃ'onin\">Daishonin<\/phoneme>/g" $ssmlpath
sed -i 's/<br>//g' $ssmlpath
sed -i 's/&nbsp;//g' $ssmlpath

awk '/<p>/{ print "<mark name=\"paragraph-" ++i "\" />" } 1' $ssmlpath > $ssmlpath.tmp && mv $ssmlpath.tmp $ssmlpath