# Resume builder
This is a simple grunt file that automates these tasks:

       build:cv  Creates a pdf and readme.md from the source markdown file.
      deploy:cv  Deploys cv files to github into the cv branch.
       build:gh  Copies appropriate files to the gh-pages directory.
      deploy:gh  Deploys gh-pages files to github.      
         deploy  All of the above.

## How to use

Checkout this repo without cloning my resume:

```bash 
mkdir yourcv
cd yourcv
git init
git remote add -t master -f origin https://github.com/Hypercubed/cv.git
git checkout master
```

Place your CV in a `./cv` directory.   Update `Gruntfile.js` as needed.

## License
Master branch is MIT

Feel free to copy and use code this breach, please don't copy my cv.