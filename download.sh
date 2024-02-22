#!/bin/bash

# Set the URL template with a placeholder for the counter
url_template="https://poizon-exports.storage.yandexcloud.net/exports/Sviridov_{counter}.json"

# Set the number of iterations
iterations=22

# Loop through the specified number of iterations
for ((counter=1; counter<=$iterations; counter++)); do
    # Substitute the counter in the URL template
    current_url=$(echo "$url_template" | sed "s/{counter}/$counter/")

    # Generate the output file path
    output_file="files/$counter.json"

    # Download the file using wget
    wget -O "$output_file" "$current_url"

    # Check if the download was successful
    if [ $? -eq 0 ]; then
        echo "Downloaded: $output_file"
    else
        echo "Failed to download: $output_file"
    fi
done

echo "Download script completed."