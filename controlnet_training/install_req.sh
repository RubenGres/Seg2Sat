pip install -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cu117
huggingface-cli login --token=$HFTOKEN
wandb login $WANDBTOKEN
