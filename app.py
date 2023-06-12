from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

@app.route('/summary', methods=['POST'])
def summarize():
    if 'text' not in request.json:
        return jsonify({'error': 'Invalid request'})

    text = request.json['text']

    summarizer = pipeline("summarization")
    summary = summarizer(text, max_length=100, min_length=30, do_sample=False)[0]['summary_text']

    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
