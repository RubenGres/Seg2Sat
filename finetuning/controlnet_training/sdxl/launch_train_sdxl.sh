accelerate launch train_controlnet_sdxl.py \
--pretrained_model_name_or_path=stabilityai/stable-diffusion-xl-base-1.0 \
--output_dir=modelout \
--dataset_name=IGNF/FLAIR_1_osm_clip \
--conditioning_image_column=segmentation \
--image_column=image \
--caption_column=prompt \
--resolution=512 \
--learning_rate=5e-6 \
--validation_image "validation/mask/MSK_066278.png" "/workspace/Drawing2Map/controlnet_training/validation/mask/MSK_067998.png" "/workspace/Drawing2Map/controlnet_training/validation/mask/MSK_073879.png" "/workspace/Drawing2Map/controlnet_training/validation/mask/MSK_074756.png" "/workspace/Drawing2Map/controlnet_training/validation/mask/MSK_076201.png" "/workspace/Drawing2Map/controlnet_training/validation/mask/zMSK_076201_style1.png" "/workspace/Drawing2Map/controlnet_training/validation/mask/zMSK_076201_style2.png" \
--validation_prompt "Aerial view of Mourenx, Pau, Pyrénées-Atlantiques, Nouvelle-Aquitaine, France métropolitaine, 64150, France. brushwood, plowed land, building, herbaceous vegetation, impervious surface." "Aerial view of Rond-Point de la 1e Armée Française - Lieutenant Paul Meyer, Mulhouse, Haut-Rhin, Grand Est, France métropolitaine, 68100, France. water, deciduous, pervious surface, building, herbaceous vegetation, impervious surface, other." "Aerial view of Chemin de Saint-Antoine, Saint-Cyr-sur-Mer, Toulon, Var, Provence-Alpes-Côte d'Azur, France métropolitaine, 83740, France. coniferous, brushwood, plowed land, deciduous, pervious surface, building, vineyard, herbaceous vegetation." "Aerial view of Impasse de Tous les Vents, Port-Cogolin, Cogolin, Draguignan, Var, Provence-Alpes-Côte d'Azur, France métropolitaine, 83310, France. water, brushwood, deciduous, pervious surface, bare soil, herbaceous vegetation." "Aerial view of 31, Rue Molière, Sacré Cœur, Pyramides, La Roche-sur-Yon, Vendée, Pays de la Loire, France métropolitaine, 85000, France. brushwood, swimming pool, deciduous, building, herbaceous vegetation, impervious surface." "Aerial view of 31, Rue Molière, Sacré Cœur, Pyramides, La Roche-sur-Yon, Vendée, Pays de la Loire, France métropolitaine, 85000, France. Black and white paper pencil drawing" "Aerial view of 31, Rue Molière, Sacré Cœur, Pyramides, La Roche-sur-Yon, Vendée, Pays de la Loire, France métropolitaine, 85000, France. Oil on canvas painting" \
--validation_steps=1000 \
--train_batch_size=5 \
--num_train_epochs=3 \
--tracker_project_name=Seg2Sat_sdxl \
--enable_xformers_memory_efficient_attention \
--checkpointing_steps=2500 \
--report_to wandb \
--push_to_hub \
--checkpoints_total_limit 6 \
--cache_dir data
