import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogData } from '../utility/data';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogData.find(post => post.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h1>
                    <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                        ← Back to all posts
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | Beyond Slim Blog</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            <div className="min-h-screen bg-gray-50 pt-24">
                <article className="max-w-4xl mx-auto px-4 py-12">
                    <Link to="/blog" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">
                        ← Back to all posts
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-[400px] object-cover rounded-xl mb-8"
                        />

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                            <span className="text-sm text-gray-500">{post.readTime}</span>
                            <span className="text-sm text-gray-500">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
                        
                        {post.author && (
                            <div className="flex items-center gap-4 mb-8">
                                <div className="font-medium text-gray-900">By {post.author}</div>
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-8">{post.content.introduction}</p>
                            
                            {post.content.sections.map((section, index) => (
                                <div key={index} className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-600">{section.content}</p>
                                </div>
                            ))}

                            <p className="text-gray-600 mt-8">{post.content.conclusion}</p>
                        </div>
                    </motion.div>
                </article>
            </div>
        </>
    );
};

export default BlogPost;
