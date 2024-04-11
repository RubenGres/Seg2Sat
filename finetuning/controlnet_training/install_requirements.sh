git clone https://github.com/huggingface/diffusers/

# if torch is needed
# pip install -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cu117

cd diffusers
pip install .

cp examples/controlnet/train_controlnet.py ../sd1.5/train_controlnet.py
cp examples/controlnet/requirements.txt ../sd1.5/requirements.txt


cp examples/controlnet/train_controlnet_sdxl.py ../sdxl/train_controlnet_sdxl.py
cp examples/controlnet/requirements_sdxl.txt ../sdxl/requirements_sdxl.txt

cd ..
