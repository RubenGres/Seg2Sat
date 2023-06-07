import os
import subprocess

os.environ["URL_GRADIO"] = "http://localhost:7860"
subprocess.run(["make", "run-prod"], shell=False)
