cmd='/'$1'/d'
echo $cmd
sed -i.bak $cmd ./dictionary.txt
wc dictionary.txt
