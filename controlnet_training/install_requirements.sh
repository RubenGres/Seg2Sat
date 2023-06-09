pip install -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cu117
git clone https://github.com/huggingface/diffusers/
cp diffusers/examples/controlnet/train_controlnet.py train_controlnet.py
huggingface-cli login
wandb login
