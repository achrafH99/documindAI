import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatResponseProps {
  content: string;
}

export const ChatResponse = ({ content }: ChatResponseProps) => {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        h3: ({node, ...props}) => <h3 className="text-cyan-400 font-bold mt-4 mb-2" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
        code: ({node, ...props}) => (
          <code className="bg-slate-800 text-pink-400 px-1 rounded font-mono text-sm" {...props} />
        ),
        strong: ({node, ...props}) => <strong className="text-cyan-300 font-semibold" {...props} />,
        table: ({node, ...props}) => (
          <div className="overflow-x-auto my-4">
            <table className="border-collapse border border-slate-700 w-full text-sm" {...props} />
          </div>
        ),
        th: ({node, ...props}) => <th className="border border-slate-700 bg-slate-800 p-2 text-left" {...props} />,
        td: ({node, ...props}) => <td className="border border-slate-700 p-2" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};