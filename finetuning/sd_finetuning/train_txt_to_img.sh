export MODEL_NAME="stabilityai/stable-diffusion-2"
export dataset_name="rgres/AerialDreams"

accelerate launch train_text_to_image.py \
--pretrained_model_name_or_path=$MODEL_NAME \
--dataset_name=$dataset_name \
--cache_dir="/workspace/cache" \
--image_column="image" \
--caption_column="prompt" \
--validation_prompts "Chemin de Saint-Antoine, Saint-Cyr-sur-Mer, Toulon, Var, Provence-Alpes-Cote d'Azur, Frane" "Aerial view of Rond-Point de la 1e Armee Francaise - Lieutenant Paul Meyer, Mulhouse, Haut-Rhin, Grand Est, France metropolitaine, 68100, France" "31, Rue Molière, SS
ace Coeur, Pyramides, La Roche-sur-Yon, Vendee, Pays de la Loire, France metropolitaine, 85000, France" "Aerial view of Mourenx, Pau, Pyrenees-Atlantiques, Nouvelle-Aquitaine, France metropolitaine, 64150, France" "17 rue du moutier, Angousrine-Vileneuve-Les-Escaldes, Pyrenees Orientales, Occitanie, France metropolitaine, 66760, France" \
--use_ema \
--resolution=512 --center_crop --random_flip \
--train_batch_size=1 \
--gradient_accumulation_steps=4 \
--mixed_precision="fp16" \
--max_train_steps=15000 \
--checkpointing_steps=1000 \
--checkpoints_total_limit=10 \
--validation_epochs=100 \
--learning_rate=1e-05 \
--max_grad_norm=1 \
--lr_scheduler="constant" --lr_warmup_steps=0 \
--output_dir="sd-seg-to-map" \
--push_to_hub \
--report_to="wandb" \
--hub_model_id="rgres/Seg2Map-finetuned"
