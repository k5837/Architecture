import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain import OpenAI
from langchain.document_loaders import DirectoryLoader
from langchain.chains import RetrievalQA
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# 设置OpenAI API密钥
os.environ["OPENAI_API_KEY"] = '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'
llm = OpenAI(model_name="gpt-3.5-turbo", max_tokens=2000)

loader = DirectoryLoader('/Users/best/Desktop/', glob='output.txt')
# 将数据转成 document 对象，每个文件会作为一个 document
documents = loader.load()

# 初始化加载器
text_splitter = CharacterTextSplitter(chunk_size=150, chunk_overlap=0)
# 切割加载的 document
split_docs = text_splitter.split_documents(documents)

# 初始化 openai 的 embeddings 对象
embeddings = OpenAIEmbeddings()
# 持久化数据到Chroma向量数据库
persist_directory = '../data/chat_vector_store'
docsearch = Chroma.from_documents(split_docs, embeddings, persist_directory=persist_directory)
docsearch.persist()

# 加载持久化的数据
loaded_docsearch = Chroma(persist_directory=persist_directory, embedding_function=embeddings)

# 创建问答对象
qa = RetrievalQA.from_chain_type(llm=OpenAI(openai_api_key="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"), chain_type="stuff", retriever=docsearch.as_retriever(), return_source_documents=True)


@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    if 'question' not in data:
        return jsonify({'error': 'Question is missing'}), 400

    question = data['question']
    answer = qa({"query": question})

    return jsonify({'answer': answer['result']})

if __name__ == '__main__':
    app.run(debug=True, port=8000)

# @app.route('/')
# def home():
#     return "Welcome to the QA API!"
# if __name__ == '__main__':
#     app.run(debug=True, port=8000)
