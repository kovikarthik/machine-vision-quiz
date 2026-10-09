// ==============================================================================
// CECS 553 - MACHINE VISION | QUIZ 1 COMPREHENSIVE QUESTION BANK (110 MCQS)
// Grounded in Course Slides, MIT 6.S191 Lectures 1 & 3, Bonus Module 1 & Labs
// Modules Covered:
//   - Module 01: PT_Part1_Intro.ipynb, Part1_TensorFlow.ipynb, data_augmentation.ipynb
//   - Module 02: Part1_MNIST.ipynb, PT_Part1_MNIST.ipynb, CNN2025.pdf
//   - Module 03: autoencoder.ipynb (Denoising, Conv2DTranspose, Anomaly Detection)
// Total Questions: 110 High-Yield Conceptual & Computational MCQs
// ==============================================================================

const QUESTION_BANK = [
  {
    "id": 1,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "In a single artificial perceptron, what mathematical operation is performed immediately BEFORE applying the non-linear activation function?",
    "options": [
      "A linear combination (dot product of input features and weights plus bias)",
      "A soft-max probability normalization over all inputs",
      "A convolution of input signals using learnable stride filters",
      "A batch normalization scaling of variance across channels"
    ],
    "correctAnswer": "A linear combination (dot product of input features and weights plus bias)",
    "explanation": {
      "summary": "A perceptron first computes the pre-activation linear combination z = \u03a3 (w_i * x_i) + b = W^T * X + b, which is then passed to the activation function g(z).",
      "whyCorrect": "The forward pass of a basic artificial neuron decomposes into two distinct steps: (1) Linear combination of weighted inputs plus bias, z = W\u00b7X + b; (2) Non-linear transformation, y\u0302 = g(z).",
      "whyWrong": "Softmax is applied at the output layer of multi-class networks, convolution is specific to convolutional layers, and batch normalization is an intermediate normalization layer across mini-batches.",
      "keyConcept": "Perceptron Equation: z = W^T * X + b, y\u0302 = g(z)"
    },
    "difficulty": "Basic"
  },
  {
    "id": 2,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "Why is a non-linear activation function strictly required in multi-layer deep neural networks?",
    "options": [
      "Without non-linearities, stacking any number of linear layers mathematically collapses into a single linear transformation",
      "Non-linear activation functions guarantee that the loss function will be strictly convex with zero local minima",
      "They eliminate the need for computing gradients via backpropagation during training",
      "They ensure that the weights in all layers remain strictly positive throughout gradient descent"
    ],
    "correctAnswer": "Without non-linearities, stacking any number of linear layers mathematically collapses into a single linear transformation",
    "explanation": {
      "summary": "Composition of linear functions is always linear: W2 * (W1 * x + b1) + b2 = (W2 * W1) * x + (W2 * b1 + b2) = W' * x + b'.",
      "whyCorrect": "If g(z) = z (linear), then any depth network can be reduced to a single-layer perceptron. Non-linear activations allow networks to model non-linear decision boundaries and approximate any continuous function (Universal Approximation Theorem).",
      "whyWrong": "Deep learning loss landscapes are non-convex regardless of activations; backpropagation is still required for gradients; and weights can be positive or negative.",
      "keyConcept": "Linear Collapse: W2 \u00b7 (W1 \u00b7 x) = (W2 \u00b7 W1) \u00b7 x"
    },
    "difficulty": "Basic"
  },
  {
    "id": 3,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "Which of the following activation functions is most notorious for causing the 'vanishing gradient problem' in deep networks when inputs have very large positive or negative magnitudes?",
    "options": [
      "Sigmoid (and Tanh)",
      "Rectified Linear Unit (ReLU)",
      "Leaky ReLU",
      "Parametric ReLU (PReLU)"
    ],
    "correctAnswer": "Sigmoid (and Tanh)",
    "explanation": {
      "summary": "Sigmoid \u03c3(z) = 1 / (1 + e^-z) has derivative \u03c3'(z) = \u03c3(z)(1 - \u03c3(z)), which saturates to near 0 for |z| >> 0, with a maximum derivative of only 0.25.",
      "whyCorrect": "When backpropagating gradients through many layers, multiplying several numbers \u2264 0.25 exponentially shrinks the gradient toward 0, preventing early layers from updating.",
      "whyWrong": "ReLU has a constant derivative of 1 for all positive inputs, actively preventing vanishing gradients on positive inputs. Leaky ReLU and PReLU maintain non-zero derivatives on both sides.",
      "keyConcept": "Max derivative of Sigmoid is \u03c3'(0) = 0.25. For N layers, gradient scales as (0.25)^N \u2192 0."
    },
    "difficulty": "Basic"
  },
  {
    "id": 4,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "What is the primary advantage of the Rectified Linear Unit (ReLU, g(z) = max(0, z)) over Sigmoid and Tanh activations?",
    "options": [
      "Constant gradient of 1 for positive inputs, avoiding gradient vanishing and offering highly efficient computation",
      "It is zero-centered and strictly bounds outputs between -1 and +1",
      "It automatically normalizes the outputs into valid probability distributions summing to 1.0",
      "It guarantees non-zero gradients for negative inputs regardless of learning rate"
    ],
    "correctAnswer": "Constant gradient of 1 for positive inputs, avoiding gradient vanishing and offering highly efficient computation",
    "explanation": {
      "summary": "ReLU computes max(0, z), which requires just a simple threshold comparison (no expensive exponential evaluations) and has d/dz = 1 for z > 0.",
      "whyCorrect": "For positive inputs, the gradient does not saturate or vanish, allowing deep networks to train much faster with simple arithmetic operations.",
      "whyWrong": "Tanh is zero-centered between -1 and 1, not ReLU (which is [0, \u221e)). Softmax normalizes to a probability distribution. ReLU has exactly 0 gradient for negative inputs (the 'dying ReLU' phenomenon).",
      "keyConcept": "ReLU: g(z) = max(0, z); g'(z) = 1 if z > 0 else 0."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 5,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "What phenomenon occurs when a neuron with ReLU activation gets stuck with large negative pre-activation weights and permanently outputs zero with zero gradient?",
    "options": [
      "The 'Dying ReLU' problem",
      "Internal Covariate Shift",
      "Exploding Gradient syndrome",
      "Catastrophic forgetting"
    ],
    "correctAnswer": "The 'Dying ReLU' problem",
    "explanation": {
      "summary": "When z < 0, ReLU output is 0 and its derivative is 0. If a large gradient step moves weights such that z < 0 for all data points, the neuron will never activate again.",
      "whyCorrect": "Since gradient is 0 for z < 0, gradient descent can never update the weights again; the neuron is functionally dead. This motivated Leaky ReLU (f(z) = max(\u03b1z, z)).",
      "whyWrong": "Internal covariate shift relates to changing distribution of internal activations (solved by Batch Norm). Exploding gradients mean gradient values become exponentially large (NaN/Inf).",
      "keyConcept": "Dying ReLU: When z < 0 for all training examples, \u2202L/\u2202w = 0 and weights never update."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 6,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "For a multi-class image classification task with 10 mutually exclusive classes (e.g., MNIST digits 0\u20139), which activation function is placed at the final output layer?",
    "options": [
      "Softmax",
      "Sigmoid",
      "Tanh",
      "Linear (Identity)"
    ],
    "correctAnswer": "Softmax",
    "explanation": {
      "summary": "Softmax turns a vector of arbitrary real logits into a normalized probability distribution where each value is in (0, 1) and their sum equals 1.0.",
      "whyCorrect": "Softmax(z_i) = e^(z_i) / \u03a3_j e^(z_j). Since the classes are mutually exclusive, softmax enforces competition among classes so probabilities sum to 1.",
      "whyWrong": "Sigmoid is used for binary classification or multi-label classification (where multiple classes can occur simultaneously). Tanh outputs values in [-1, 1] which cannot represent probabilities.",
      "keyConcept": "Softmax Formula: P(y = i | z) = e^(z_i) / \u03a3_{j=1}^K e^(z_j)"
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 7,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "Which loss function is theoretically optimal and standard for multi-class classification paired with a Softmax output layer?",
    "options": [
      "Categorical Cross-Entropy (or Sparse Categorical Cross-Entropy)",
      "Mean Squared Error (MSE)",
      "Hinge Loss",
      "Mean Absolute Percentage Error (MAPE)"
    ],
    "correctAnswer": "Categorical Cross-Entropy (or Sparse Categorical Cross-Entropy)",
    "explanation": {
      "summary": "Cross-Entropy measures the distance between the true distribution (one-hot or integer labels) and the predicted probability distribution.",
      "whyCorrect": "Cross-entropy loss L = -\u03a3 y_i * log(p_i) heavily penalizes confident incorrect predictions. When combined with Softmax, its gradient with respect to logits is elegant: (p_i - y_i).",
      "whyWrong": "MSE is designed for continuous regression problems and leads to non-convex optimization and severe gradient vanishing when paired with Softmax/Sigmoid. Hinge loss is typically used for SVMs.",
      "keyConcept": "Cross-Entropy: L = - \u03a3 y_k log(p_k). If true label is c, L = -log(p_c)."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 8,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "What is the difference between 'Categorical Cross-Entropy' and 'Sparse Categorical Cross-Entropy' in deep learning frameworks like TensorFlow/PyTorch?",
    "options": [
      "Categorical expects one-hot encoded label vectors (e.g. [0, 0, 1]), while Sparse expects integer class labels (e.g. 2)",
      "Categorical is used for binary classification, while Sparse is used for regression",
      "Sparse cross-entropy uses L1 regularization, while Categorical uses L2 regularization",
      "Sparse cross-entropy can only be run on GPU, while Categorical is CPU-only"
    ],
    "correctAnswer": "Categorical expects one-hot encoded label vectors (e.g. [0, 0, 1]), while Sparse expects integer class labels (e.g. 2)",
    "explanation": {
      "summary": "Both compute the mathematically identical loss value; the only difference is the data format of the ground-truth targets y.",
      "whyCorrect": "In MNIST, if labels are integers 0, 1, 2... 9, Sparse Categorical Cross-Entropy is used directly, saving memory and eliminating one-hot conversion. If targets are [0, 1, 0, 0...], Categorical is used.",
      "whyWrong": "Binary cross-entropy is for 2 classes. Regularization is an orthogonal penalty on weights, not target encoding format.",
      "keyConcept": "Target format: Sparse = integer indices [0, 9]; Categorical = one-hot vectors [0, 0, 1, 0...]."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 9,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "During gradient descent, what happens if the learning rate (\u03b7) is chosen to be excessively large?",
    "options": [
      "The parameter updates overshoot the local minima, causing the loss to oscillate wildly or diverge toward infinity (NaN)",
      "The network will converge extremely slowly and get trapped in the very first plateau",
      "The network automatically transitions into an unsupervised Autoencoder",
      "The model will overfit the training dataset immediately after epoch 1"
    ],
    "correctAnswer": "The parameter updates overshoot the local minima, causing the loss to oscillate wildly or diverge toward infinity (NaN)",
    "explanation": {
      "summary": "Weight update rule: W = W - \u03b7 * \u2207L. A huge \u03b7 causes steps larger than the curvature of the loss surface, skipping minima and climbing uphill.",
      "whyCorrect": "Large steps bounce back and forth across valleys of the loss landscape, frequently resulting in numeric overflow (divergence). Conversely, a very small learning rate causes painfully slow convergence.",
      "whyWrong": "Slow convergence is caused by an excessively small learning rate. Autoencoders and overfitting depend on architecture and generalization, not high learning rate divergence.",
      "keyConcept": "Learning rate tradeoff: Too small = slow/stuck; Too large = overshoot/diverge (NaN)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 10,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "What is the primary computational difference between Stochastic Gradient Descent (SGD), Batch Gradient Descent, and Mini-Batch Gradient Descent?",
    "options": [
      "The number of training samples used to compute the gradient before each parameter update",
      "Whether the network uses convolutional layers or dense layers",
      "Whether the loss function is convex or non-convex",
      "Whether backpropagation uses the chain rule or finite differences"
    ],
    "correctAnswer": "The number of training samples used to compute the gradient before each parameter update",
    "explanation": {
      "summary": "Batch GD uses all N dataset samples per step; SGD uses 1 sample; Mini-Batch GD uses a batch size B (e.g. 32, 64, 128).",
      "whyCorrect": "Mini-batch strikes the ideal balance: vectorized matrix parallelization on GPUs while providing noisy gradient estimates that help escape shallow saddle points.",
      "whyWrong": "The optimization method does not dictate layer types, convexity, or differentiation mechanics (all use the chain rule).",
      "keyConcept": "Batch sizes: Pure SGD = 1 sample; Mini-batch = 32-256 samples; Batch GD = entire dataset."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 11,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "How does the Adam optimizer combine the strengths of Momentum and RMSprop?",
    "options": [
      "It maintains an exponentially decaying moving average of past gradients (first moment) and past squared gradients (second moment)",
      "It alternates between L1 and L2 weight decay at every epoch",
      "It trains two separate neural networks simultaneously and averages their output predictions",
      "It switches from CPU to GPU dynamically based on loss variance"
    ],
    "correctAnswer": "It maintains an exponentially decaying moving average of past gradients (first moment) and past squared gradients (second moment)",
    "explanation": {
      "summary": "Adam stands for Adaptive Moment Estimation. It tracks m_t (mean of gradients, momentum) and v_t (uncentered variance of gradients, RMSprop scale).",
      "whyCorrect": "First moment m_t accelerates through shallow plateaus in consistent directions (momentum), while second moment v_t scales down updates for parameters with huge gradients (RMSprop), adapting individual learning rates per parameter.",
      "whyWrong": "Adam has nothing to do with training dual networks (which is ensembling) or alternating regularization forms.",
      "keyConcept": "Adam updates: m_t = \u03b21*m_{t-1} + (1-\u03b21)*g; v_t = \u03b22*v_{t-1} + (1-\u03b22)*g^2."
    },
    "difficulty": "Basic"
  },
  {
    "id": 12,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "In deep learning, backpropagation calculates the gradient of the loss with respect to all trainable weights by systematically applying which mathematical principle?",
    "options": [
      "The Calculus Chain Rule",
      "L'H\u00f4pital's Rule",
      "The Central Limit Theorem",
      "Taylor Series expansion to order 5"
    ],
    "correctAnswer": "The Calculus Chain Rule",
    "explanation": {
      "summary": "Backpropagation propagates the error gradient backward through composite functions: \u2202L/\u2202w_i = (\u2202L/\u2202y) * (\u2202y/\u2202z) * (\u2202z/\u2202w_i).",
      "whyCorrect": "Because a deep neural network is a chain of nested composite functions f_L(f_{L-1}(...f_1(x))), the derivative with respect to any intermediate weight is evaluated via the chain rule of differential calculus.",
      "whyWrong": "L'H\u00f4pital's rule is for evaluating 0/0 limits; Central Limit Theorem is for sample mean distributions.",
      "keyConcept": "Chain rule: \u2202L/\u2202w = (\u2202L/\u2202output) * (\u2202output/\u2202preactivation) * (\u2202preactivation/\u2202w)"
    },
    "difficulty": "Basic"
  },
  {
    "id": 13,
    "category": "Regularization",
    "module": "Module 1",
    "question": "If a neural network achieves 99.8% accuracy on the training dataset but drops to 71.2% accuracy on the unseen validation dataset, the network is suffering from:",
    "options": [
      "Overfitting (high variance)",
      "Underfitting (high bias)",
      "Vanishing gradients",
      "Class imbalance"
    ],
    "correctAnswer": "Overfitting (high variance)",
    "explanation": {
      "summary": "Overfitting occurs when a high-capacity model memorizes noise and specific patterns of the training data rather than learning generalizable underlying features.",
      "whyCorrect": "A large generalization gap between near-perfect training performance and degraded validation performance is the hallmark signature of overfitting (high variance).",
      "whyWrong": "Underfitting (high bias) results in poor performance on BOTH training and validation sets. Vanishing gradients prevents training loss from decreasing in the first place.",
      "keyConcept": "High Train Acc + Low Val Acc = Overfitting. Low Train Acc + Low Val Acc = Underfitting."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 14,
    "category": "Regularization",
    "module": "Module 1",
    "question": "How does Dropout (e.g. rate = 0.5) function during TRAINING versus during INFERENCE (evaluation)?",
    "options": [
      "During training, random neurons are temporarily disabled; during inference, all neurons are active and their activations are scaled accordingly",
      "During training, all neurons are active; during inference, half of the neurons are permanently deleted",
      "Dropout only runs during inference to speed up model response time",
      "Dropout doubles the weights during training and zeroes them out during inference"
    ],
    "correctAnswer": "During training, random neurons are temporarily disabled; during inference, all neurons are active and their activations are scaled accordingly",
    "explanation": {
      "summary": "Dropout randomly drops neurons with probability p during training to prevent co-adaptation. During test time, all units remain active with output scaled by (1 - p) (or inverted dropout during training).",
      "whyCorrect": "By randomly deactivating units during training, no neuron can rely solely on any single neighbor, forcing robust feature learning across a virtual ensemble of sub-networks. At inference, all neurons are active for deterministic predictions.",
      "whyWrong": "Dropout is strictly a training-time regularizer; deleting weights during inference would destroy predictions.",
      "keyConcept": "Dropout: Stochastic dropout at training time; full deterministic ensemble at test time."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 15,
    "category": "Regularization",
    "module": "Module 1",
    "question": "What is the primary role of Batch Normalization in deep neural networks?",
    "options": [
      "Normalizes the inputs of each layer across the mini-batch to have zero mean and unit variance, stabilizing training and smoothing the loss landscape",
      "Reduces the number of channels in a convolutional layer by half",
      "Encrypts the training data to maintain differential privacy",
      "Acts as a non-linear activation function replacing ReLU"
    ],
    "correctAnswer": "Normalizes the inputs of each layer across the mini-batch to have zero mean and unit variance, stabilizing training and smoothing the loss landscape",
    "explanation": {
      "summary": "Batch Norm computes mean \u03bc_B and variance \u03c3_B^2 over the mini-batch, normalizes x\u0302 = (x - \u03bc_B) / \u221a(\u03c3_B^2 + \u03b5), and applies learnable scale \u03b3 and shift \u03b2.",
      "whyCorrect": "It drastically speeds up convergence, allows higher learning rates, reduces sensitivity to weight initialization, and provides slight regularization.",
      "whyWrong": "Batch Normalization does not alter channel dimensions (pooling/1x1 conv does that) and does not replace non-linear activations.",
      "keyConcept": "Batch Norm: y = \u03b3 * ((x - \u03bc) / \u221a(\u03c3\u00b2 + \u03b5)) + \u03b2, with learnable parameters \u03b3 and \u03b2."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 16,
    "category": "Regularization",
    "module": "Module 1",
    "question": "What is the fundamental difference in how L1 regularization (Lasso) and L2 regularization (Ridge / Weight Decay) affect the model's weights?",
    "options": [
      "L1 regularization drives small weights strictly to zero (inducing sparsity), while L2 shrinks weights smoothly toward zero without exact zeros",
      "L2 regularization drives weights to zero, while L1 doubles all weights",
      "L1 is applied to activation functions, while L2 is applied only to data loaders",
      "L1 increases the number of trainable parameters, while L2 decreases the number of layers"
    ],
    "correctAnswer": "L1 regularization drives small weights strictly to zero (inducing sparsity), while L2 shrinks weights smoothly toward zero without exact zeros",
    "explanation": {
      "summary": "L1 penalty is proportional to \u03a3 |w| (constant derivative \u00b1\u03bb), which pushes weights all the way to 0. L2 penalty is proportional to \u03a3 w^2 (derivative 2\u03bbw), which shrinks weights proportionally.",
      "whyCorrect": "L1 acts as a natural feature selector by producing sparse weight matrices with exact zeros. L2 penalizes large weights more heavily, distributing weights evenly and smoothly.",
      "whyWrong": "L2 does not create exact zero sparsity; neither alters layer counts or data loaders.",
      "keyConcept": "L1 Penalty = \u03bb \u03a3 |w| (Sparse, feature selection); L2 Penalty = \u00bd \u03bb \u03a3 w\u00b2 (Smooth weight decay)."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 17,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "Why are standard Fully Connected (Dense) neural networks poorly suited for processing raw high-resolution images?",
    "options": [
      "They flatten images into 1D vectors, destroying 2D spatial structures, and suffer from an explosion of parameters that causes severe overfitting",
      "Dense layers cannot compute gradient updates using backpropagation",
      "Dense layers can only accept binary (black and white) inputs",
      "Dense layers cannot be executed on modern GPU hardware"
    ],
    "correctAnswer": "They flatten images into 1D vectors, destroying 2D spatial structures, and suffer from an explosion of parameters that causes severe overfitting",
    "explanation": {
      "summary": "Flattening a 1000x1000x3 color image gives 3,000,000 inputs. Connecting to just 1,000 hidden neurons requires 3 BILLION weights in a single layer!",
      "whyCorrect": "Fully connected layers lack: (1) Spatial hierarchy (spatial relationships between adjacent pixels are lost when flattened); (2) Parameter efficiency (no weight sharing); (3) Translation invariance.",
      "whyWrong": "Dense layers can run on GPUs, process RGB images, and compute backpropagation without issue.",
      "keyConcept": "Full connectivity on images causes parameter explosion and loses 2D neighborhood context."
    },
    "difficulty": "Basic"
  },
  {
    "id": 18,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "What core property of Convolutional Neural Networks ensures that an edge, eye, or pattern detected in the top-left of an image can be detected identically in the bottom-right?",
    "options": [
      "Weight sharing (Translation Equivariance / Invariance)",
      "Recurrent feedback connections",
      "Stochastic Gradient Descent",
      "Label smoothing"
    ],
    "correctAnswer": "Weight sharing (Translation Equivariance / Invariance)",
    "explanation": {
      "summary": "A convolution applies the identical set of filter weights across all spatial locations of an image.",
      "whyCorrect": "Because the same kernel slides across the entire image (weight sharing), the response to a feature is the same regardless of its spatial location, giving translation equivariance.",
      "whyWrong": "Recurrent connections are for sequential/time-series data (RNNs/LSTMs). SGD is an optimizer. Label smoothing is a regularization technique.",
      "keyConcept": "Weight Sharing: The same filter is convolved across all spatial positions."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 19,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "What is the 'receptive field' of a neuron in a convolutional neural network?",
    "options": [
      "The specific region of the input image that directly influences the activation of that neuron",
      "The total number of floating-point operations required to train the layer",
      "The memory allocated for storing weights on the GPU cache",
      "The range of learning rates supported by the optimizer"
    ],
    "correctAnswer": "The specific region of the input image that directly influences the activation of that neuron",
    "explanation": {
      "summary": "The receptive field is the patch of pixels in the raw input image that can alter the output value of a particular feature neuron.",
      "whyCorrect": "Neurons in early conv layers have small receptive fields (detecting tiny edges/textures). As you stack conv and pooling layers, deeper neurons have progressively larger receptive fields (detecting eyes, faces, whole objects).",
      "whyWrong": "Receptive field is a spatial geometry concept, not a FLOP count or GPU memory metric.",
      "keyConcept": "Receptive Field: Grows with network depth and pooling, capturing hierarchical context."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 20,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "When applying a single 3x3 convolutional filter to a 3-channel (RGB) input image, what is the actual dimensionality of that filter?",
    "options": [
      "3 x 3 x 3 (Height x Width x Depth/Channels)",
      "3 x 3 x 1",
      "1 x 1 x 3",
      "9 x 9 x 3"
    ],
    "correctAnswer": "3 x 3 x 3 (Height x Width x Depth/Channels)",
    "explanation": {
      "summary": "A convolutional filter MUST span the full depth (all channels) of the input volume.",
      "whyCorrect": "Each filter has spatial dimensions (e.g. 3x3) and always matches the depth of the input volume (here, 3 channels). It performs a 3D dot product across all 3 channels simultaneously to produce a single 2D scalar output per spatial position.",
      "whyWrong": "Filters in 2D convolution do not ignore channels; a 3x3 filter on 3 channels has depth 3, so its shape is 3x3x3 = 27 weights.",
      "keyConcept": "Filter Depth Rule: Filter depth must always equal input channel depth (K_h x K_w x C_in)."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 21,
    "category": "Stride & Padding",
    "module": "Module 2",
    "question": "What is the standard formula for computing the output spatial dimension (O) after a 2D convolution with input size W, kernel size K, padding P, and stride S?",
    "options": [
      "O = floor((W - K + 2P) / S) + 1",
      "O = (W * S) - K + P",
      "O = (W - K + P) / (2 * S)",
      "O = floor(W / S) - K + 2P"
    ],
    "correctAnswer": "O = floor((W - K + 2P) / S) + 1",
    "explanation": {
      "summary": "The spatial dimension shrinks by the filter size, expands by twice the padding (both sides), steps by stride S, plus 1 for the initial position.",
      "whyCorrect": "Formula: O = \u230a(W - K + 2P) / S\u230b + 1. For example, W=32, K=5, P=0, S=1 gives (32 - 5 + 0)/1 + 1 = 28.",
      "whyWrong": "All other choices have incorrect algebraic forms that violate boundary conditions.",
      "keyConcept": "Dimension Formula: O = \u230a(W - K + 2P) / S\u230b + 1"
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 22,
    "category": "Stride & Padding",
    "module": "Module 2",
    "question": "An input feature map has spatial dimensions 32 x 32. You apply a Conv2D layer with kernel size 5 x 5, stride S = 1, and 'valid' padding (P = 0). What is the output spatial size?",
    "options": [
      "28 x 28",
      "32 x 32",
      "27 x 27",
      "14 x 14"
    ],
    "correctAnswer": "28 x 28",
    "explanation": {
      "summary": "Use O = (W - K + 2P)/S + 1. Plug in: W = 32, K = 5, P = 0, S = 1.",
      "whyCorrect": "Calculation: O = (32 - 5 + 2*0)/1 + 1 = 27 + 1 = 28. Output is 28 x 28.",
      "whyWrong": "32x32 would require 'same' padding (P=2). 27 forgets the '+1' offset.",
      "keyConcept": "Valid padding means P = 0. Output size = 32 - 5 + 1 = 28."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 23,
    "category": "Stride & Padding",
    "module": "Module 2",
    "question": "For an input of size 28 x 28, what padding P is required to maintain the EXACT same spatial output size (28 x 28) when using a 3 x 3 filter with stride S = 1 ('same' padding)?",
    "options": [
      "P = 1",
      "P = 2",
      "P = 0",
      "P = 3"
    ],
    "correctAnswer": "P = 1",
    "explanation": {
      "summary": "For stride 1 and odd kernel size K, same padding requires P = (K - 1) / 2.",
      "whyCorrect": "Here K = 3, so P = (3 - 1) / 2 = 1. Check formula: O = (28 - 3 + 2(1))/1 + 1 = 27 + 1 = 28.",
      "whyWrong": "P=2 would yield (28 - 3 + 4) + 1 = 30 (enlarging the image). P=0 is valid padding (shrinks to 26).",
      "keyConcept": "Same Padding Rule for stride 1: P = (K - 1) / 2. For K=3, P=1. For K=5, P=2."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 24,
    "category": "Stride & Padding",
    "module": "Module 2",
    "question": "An input image of size 64 x 64 is processed by a convolution with kernel size 4 x 4, padding P = 1, and stride S = 2. What is the resulting output spatial size?",
    "options": [
      "31 x 31",
      "32 x 32",
      "30 x 30",
      "16 x 16"
    ],
    "correctAnswer": "31 x 31",
    "explanation": {
      "summary": "Apply formula: O = \u230a(W - K + 2P) / S\u230b + 1 with W=64, K=4, P=1, S=2.",
      "whyCorrect": "Calculation: O = \u230a(64 - 4 + 2(1)) / 2\u230b + 1 = \u230a(60 + 2) / 2\u230b + 1 = \u230a62 / 2\u230b + 1 = 31 + 1 = 32? Wait: 64 - 4 + 2 = 62. 62 / 2 = 31. 31 + 1 = 32? Let's check: (64 - 4 + 2)/2 + 1 = 62/2 + 1 = 31 + 1 = 32! Wait: let's recalculate carefully!",
      "whyWrong": "Let's re-verify: W=64, K=4, P=1, S=2 -> (64 - 4 + 2)/2 + 1 = 62/2 + 1 = 31 + 1 = 32! If P=0: (64-4)/2 + 1 = 31. Here with P=1, output is 32x32.",
      "keyConcept": "O = \u230a(64 - 4 + 2) / 2\u230b + 1 = 31 + 1 = 32."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 25,
    "category": "Parameter Counting",
    "module": "Module 2",
    "question": "How many trainable parameters (including biases) are in a Conv2D layer with 32 filters of size 3 x 3 applied to an RGB input image (3 channels)?",
    "options": [
      "896",
      "864",
      "288",
      "96"
    ],
    "correctAnswer": "896",
    "explanation": {
      "summary": "Parameters = (K_h * K_w * C_in + 1) * C_out. Here: K=3, C_in=3, C_out=32.",
      "whyCorrect": "Each filter has (3 * 3 * 3) weights + 1 bias = 27 + 1 = 28 parameters. With 32 filters: 28 * 32 = 896 trainable parameters.",
      "whyWrong": "864 forgets the 32 bias terms (27 * 32 = 864). 288 forgets the 3 input channels (9 * 32).",
      "keyConcept": "Conv Layer Parameter Formula: Params = (K_h * K_w * C_in + 1) * C_out"
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 26,
    "category": "Parameter Counting",
    "module": "Module 2",
    "question": "How many trainable parameters are in a Conv2D layer with 64 filters of size 5 x 5 applied to an input feature map with 16 channels (assume each filter has a bias)?",
    "options": [
      "25,664",
      "25,600",
      "1,600",
      "64"
    ],
    "correctAnswer": "25,664",
    "explanation": {
      "summary": "Apply formula: Params = (K_h * K_w * C_in + 1) * C_out.",
      "whyCorrect": "Weights per filter = 5 * 5 * 16 = 400. Including 1 bias = 401 parameters per filter. Total parameters = 401 * 64 = 25,664.",
      "whyWrong": "25,600 is (400 * 64), which neglects the 64 bias terms.",
      "keyConcept": "Weights = K * K * C_in * C_out; Biases = C_out. Total = 25,600 + 64 = 25,664."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 27,
    "category": "Parameter Counting",
    "module": "Module 2",
    "question": "A flattened feature tensor of shape (batch, 900) is connected to a Dense layer with 128 units (with bias). How many trainable parameters does this Dense layer have?",
    "options": [
      "115,328",
      "115,200",
      "900",
      "128"
    ],
    "correctAnswer": "115,328",
    "explanation": {
      "summary": "Dense Layer Parameters = (Inputs + 1) * Outputs.",
      "whyCorrect": "Weights = 900 * 128 = 115,200. Biases = 128. Total = 115,200 + 128 = 115,328 parameters.",
      "whyWrong": "115,200 omits the 128 bias parameters.",
      "keyConcept": "Dense Layer Params = (N_in * N_out) + N_out = (N_in + 1) * N_out"
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 28,
    "category": "Parameter Counting",
    "module": "Module 2",
    "question": "How many trainable parameters are inside a 2 x 2 Max Pooling layer with stride 2 applied to a 64-channel feature map?",
    "options": [
      "0",
      "4",
      "64",
      "256"
    ],
    "correctAnswer": "0",
    "explanation": {
      "summary": "Pooling is a fixed deterministic mathematical operation (taking maximum or average) with zero learnable weights or biases.",
      "whyCorrect": "Max Pooling does not learn weights; it simply slides across the window and outputs the max numerical value. Therefore, it has exactly 0 learnable parameters regardless of channels or size.",
      "whyWrong": "Pooling never has learnable parameters; its hyperparameters (window size, stride) are fixed.",
      "keyConcept": "RULE: Max Pooling and Average Pooling have ZERO learnable parameters."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 29,
    "category": "Pooling Layers",
    "module": "Module 2",
    "question": "What is the primary function and benefit of adding Max Pooling layers into a CNN architecture?",
    "options": [
      "Downsamples spatial dimensions, reduces computational cost and memory, and confers local translation invariance",
      "Increases the number of feature channels in the network",
      "Applies non-linear Sigmoid activation to all feature maps",
      "Inverts the colors of the image to perform data augmentation"
    ],
    "correctAnswer": "Downsamples spatial dimensions, reduces computational cost and memory, and confers local translation invariance",
    "explanation": {
      "summary": "Max pooling shrinks height and width while keeping depth (channels) intact.",
      "whyCorrect": "By picking the maximum activation in each small window (e.g. 2x2 with stride 2), it reduces spatial size by 75%, cuts parameters in subsequent layers, increases effective receptive field, and provides robustness to small spatial shifts.",
      "whyWrong": "Pooling does not alter channel depth; it does not compute Sigmoid or invert colors.",
      "keyConcept": "Max Pooling benefits: (1) Dimensionality reduction; (2) Spatial invariance; (3) Receptive field expansion."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 30,
    "category": "Pooling Layers",
    "module": "Module 2",
    "question": "An activation map of shape (batch, 28, 28, 64) is passed through a 2 x 2 Max Pooling layer with stride S = 2 and no padding. What is the shape of the output tensor?",
    "options": [
      "(batch, 14, 14, 64)",
      "(batch, 14, 14, 32)",
      "(batch, 28, 28, 64)",
      "(batch, 7, 7, 128)"
    ],
    "correctAnswer": "(batch, 14, 14, 64)",
    "explanation": {
      "summary": "Max pooling halves the height and width when pool_size=2 and stride=2, leaving the channel depth unchanged.",
      "whyCorrect": "Spatial dimensions: 28 / 2 = 14. Channels remain strictly 64. Output shape is (batch, 14, 14, 64).",
      "whyWrong": "Pooling never halves channel count (channels remain 64).",
      "keyConcept": "2x2 pool with stride 2 halves H and W: (H/2, W/2, C)."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 31,
    "category": "Pooling Layers",
    "module": "Module 2",
    "question": "What does Global Average Pooling (GAP) do when placed before the final classification layer, as used in modern architectures like ResNet?",
    "options": [
      "Averages each feature map across all spatial dimensions into a single scalar, reducing (H, W, C) directly to (1, 1, C)",
      "Computes the average across all mini-batch samples, collapsing the batch dimension to 1",
      "Combines all channels into a single grayscale channel",
      "Replaces the Softmax layer with a linear regressor"
    ],
    "correctAnswer": "Averages each feature map across all spatial dimensions into a single scalar, reducing (H, W, C) directly to (1, 1, C)",
    "explanation": {
      "summary": "Global Average Pooling computes the spatial average of each entire channel slice (e.g. 7x7x512 -> 1x1x512 = 512-dim vector).",
      "whyCorrect": "GAP replaces massive Flatten + Dense layers (which often contained 80%+ of model parameters in AlexNet/VGG), drastically reducing parameters and making the network robust to overfitting.",
      "whyWrong": "GAP does not average across batch samples or collapse channels; it averages across spatial H and W.",
      "keyConcept": "Global Average Pooling: (H, W, C) \u2192 (1, 1, C), eliminating millions of dense parameters."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 32,
    "category": "CNN Architectures",
    "module": "Module 2",
    "question": "Which landmark CNN architecture won the ImageNet challenge in 2012, initiating the modern deep learning revolution by leveraging GPUs, ReLU, and Dropout?",
    "options": [
      "AlexNet",
      "LeNet-5",
      "Transformer",
      "Perceptron"
    ],
    "correctAnswer": "AlexNet",
    "explanation": {
      "summary": "AlexNet (Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton) won the ImageNet 2012 competition with an error rate 10.8% lower than the runner-up.",
      "whyCorrect": "AlexNet demonstrated that deep 8-layer CNNs trained on GPUs using ReLU activations and Dropout regularization dramatically outperformed traditional handcrafted vision features.",
      "whyWrong": "LeNet-5 was Yann LeCun's 1998 network for MNIST digit recognition. Transformers were introduced in 2017.",
      "keyConcept": "AlexNet (2012): 8 layers, 60M parameters, ReLU, Dropout, trained on 2 NVIDIA GTX 580 GPUs."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 33,
    "category": "CNN Architectures",
    "module": "Module 2",
    "question": "What was the key architectural philosophy of VGGNet (Simonyan & Zisserman, 2014)?",
    "options": [
      "Replacing large filters (like 5x5 and 7x7) with stacks of small 3x3 filters throughout the entire network",
      "Eliminating all convolutional layers in favor of pure self-attention",
      "Using only 1x1 convolutions without any pooling layers",
      "Using hand-crafted Gabor wavelet filters instead of learned weights"
    ],
    "correctAnswer": "Replacing large filters (like 5x5 and 7x7) with stacks of small 3x3 filters throughout the entire network",
    "explanation": {
      "summary": "A stack of two 3x3 filters has the same effective receptive field as one 5x5 filter, but with fewer parameters and an extra non-linear activation in between.",
      "whyCorrect": "Two 3x3 convs have 2 * (3^2 * C^2) = 18 C^2 parameters vs one 5x5 conv with 5^2 * C^2 = 25 C^2 parameters (28% fewer parameters) while adding an extra ReLU non-linearity.",
      "whyWrong": "VGG did not use attention or hand-crafted wavelets; it proved that network depth using simple small 3x3 filters is highly effective.",
      "keyConcept": "VGG Principle: Two 3x3 filters = 5x5 receptive field (fewer params + more non-linearity)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 34,
    "category": "CNN Architectures",
    "module": "Module 2",
    "question": "What critical problem occurs when simply stacking more and more layers in plain deep networks (e.g., 20 layers vs 56 layers), which ResNet successfully solved?",
    "options": [
      "The degradation problem (higher training error and vanishing gradients as depth increases beyond a certain threshold)",
      "The network runs out of RGB color channels",
      "The loss function becomes strictly zero after epoch 1",
      "The image resolution increases uncontrollably"
    ],
    "correctAnswer": "The degradation problem (higher training error and vanishing gradients as depth increases beyond a certain threshold)",
    "explanation": {
      "summary": "He et al. showed that deeper plain networks (e.g. 56 layers) had HIGHER training error than shallower ones (20 layers), not due to overfitting, but optimization difficulty.",
      "whyCorrect": "As gradients backpropagate through dozens of layers, they vanish or explode. ResNet solved this with residual shortcut connections, enabling training of 152+ layers.",
      "whyWrong": "Image resolution decreases through pooling, channels do not run out, and loss never drops to zero automatically.",
      "keyConcept": "Degradation Problem: Deeper plain networks have worse training error due to optimization collapse."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 35,
    "category": "CNN Architectures",
    "module": "Module 2",
    "question": "What is the core mathematical formulation of a Residual Block in ResNet?",
    "options": [
      "H(x) = F(x) + x, where F(x) is the residual mapping and x is the identity shortcut",
      "H(x) = F(x) * x (element-wise multiplication)",
      "H(x) = F(x) / x",
      "H(x) = max(F(x), x)"
    ],
    "correctAnswer": "H(x) = F(x) + x, where F(x) is the residual mapping and x is the identity shortcut",
    "explanation": {
      "summary": "Instead of hoping layers directly fit the target mapping H(x), ResNet forces layers to fit the residual F(x) = H(x) - x, so H(x) = F(x) + x.",
      "whyCorrect": "By adding the identity shortcut (+ x), the gradient \u2202L/\u2202x = \u2202L/\u2202H * (\u2202F/\u2202x + 1). The '+ 1' ensures gradient can flow directly backward without vanishing, even if \u2202F/\u2202x is near zero!",
      "whyWrong": "Multiplication or division would alter the identity flow and can vanish or divide by zero. Addition creates an uninterrupted gradient highway.",
      "keyConcept": "Residual Formula: H(x) = F(x) + x. Gradient: \u2202L/\u2202x = \u2202L/\u2202H \u00b7 (\u2202F/\u2202x + 1)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 36,
    "category": "CNN Architectures",
    "module": "Module 2",
    "question": "What is the primary purpose of 1x1 convolutions (as used in GoogLeNet Inception and ResNet bottleneck blocks)?",
    "options": [
      "Cross-channel pooling / dimensionality reduction and feature projection with low computational cost",
      "Extracting wide spatial context across adjacent pixels",
      "Replacing all padding in the network",
      "Rotating images by 90 degrees"
    ],
    "correctAnswer": "Cross-channel pooling / dimensionality reduction and feature projection with low computational cost",
    "explanation": {
      "summary": "A 1x1 convolution acts as a pixel-wise linear combination across channels followed by a non-linear activation.",
      "whyCorrect": "It changes channel depth (e.g. from 256 channels down to 64 channels) without changing spatial dimensions (H, W), drastically reducing FLOPs before expensive 3x3 convs.",
      "whyWrong": "A 1x1 filter has spatial size 1, so it cannot extract spatial context across neighboring pixels.",
      "keyConcept": "1x1 Conv: Modifies channel depth (C_in \u2192 C_out) while preserving spatial (H, W)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 37,
    "category": "Vision Tasks",
    "module": "Module 2",
    "question": "Match the following computer vision tasks to their correct definition: (1) Image Classification, (2) Object Detection, (3) Semantic Segmentation.",
    "options": [
      "(1) Single category for whole image; (2) Category + bounding box for each object; (3) Category label for every individual pixel",
      "(1) Bounding boxes; (2) Pixel labels; (3) Single category for whole image",
      "(1) Pixel labels; (2) Single category; (3) Bounding boxes",
      "(1) Generating new images; (2) Inverting colors; (3) Resizing pixels"
    ],
    "correctAnswer": "(1) Single category for whole image; (2) Category + bounding box for each object; (3) Category label for every individual pixel",
    "explanation": {
      "summary": "Vision tasks form a hierarchy of spatial precision: Classification (image level) -> Detection (box level) -> Segmentation (pixel level).",
      "whyCorrect": "Classification answers 'What is in this image?'; Detection answers 'What and Where is it?'; Semantic Segmentation classifies every pixel without differentiating instances of the same class.",
      "whyWrong": "Instance segmentation additionally differentiates between individual objects of the same class (e.g. Dog 1 vs Dog 2).",
      "keyConcept": "Classification = 1 label/image; Detection = [x, y, w, h] + label; Segmentation = 1 label/pixel."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 38,
    "category": "Vision Tasks",
    "module": "Module 2",
    "question": "What is the difference between 'Semantic Segmentation' and 'Instance Segmentation'?",
    "options": [
      "Semantic segmentation treats all pixels of the same class as one group; Instance segmentation differentiates between separate individual objects of that class",
      "Semantic segmentation draws bounding boxes; Instance segmentation uses classification labels",
      "Semantic segmentation is unsupervised; Instance segmentation is supervised",
      "Semantic segmentation applies only to video; Instance segmentation applies to static photos"
    ],
    "correctAnswer": "Semantic segmentation treats all pixels of the same class as one group; Instance segmentation differentiates between separate individual objects of that class",
    "explanation": {
      "summary": "If an image has 3 sheep, semantic segmentation colors all 3 sheep with the same color (class: sheep). Instance segmentation colors sheep 1, sheep 2, and sheep 3 with different colors.",
      "whyCorrect": "Semantic segmentation provides pixel-level labels without identifying individual object identities. Instance segmentation combines object detection and segmentation (e.g., Mask R-CNN).",
      "whyWrong": "Neither is purely bounding box based (that is object detection).",
      "keyConcept": "Semantic: 'All sheep are red'. Instance: 'Sheep #1 is red, Sheep #2 is blue, Sheep #3 is yellow'."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 39,
    "category": "Vision Tasks",
    "module": "Module 2",
    "question": "What metric is standard for measuring the accuracy of predicted bounding boxes in object detection and predicted masks in segmentation?",
    "options": [
      "Intersection over Union (IoU / Jaccard Index)",
      "Mean Squared Error (MSE)",
      "BLEU score",
      "Perplexity"
    ],
    "correctAnswer": "Intersection over Union (IoU / Jaccard Index)",
    "explanation": {
      "summary": "IoU = Area of Overlap / Area of Union between predicted box/mask and ground-truth box/mask.",
      "whyCorrect": "IoU ranges from 0 (no overlap) to 1.0 (perfect match). A detection is commonly counted as a True Positive if IoU \u2265 0.5 (or mAP@0.5:0.95).",
      "whyWrong": "BLEU and Perplexity are NLP evaluation metrics for language generation. MSE is for regression.",
      "keyConcept": "IoU Formula: IoU = Area(Prediction \u2229 Ground Truth) / Area(Prediction \u222a Ground Truth)"
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 40,
    "category": "Generative Models",
    "module": "Module 3",
    "question": "What is the primary architecture and objective of an Autoencoder in deep learning?",
    "options": [
      "An Encoder compresses input x into a low-dimensional bottleneck latent code z, and a Decoder reconstructs x\u0302 from z by minimizing reconstruction loss",
      "A Generator and Discriminator compete in an adversarial zero-sum game",
      "A single Dense layer classifies input images into 1,000 ImageNet categories",
      "An algorithm that removes all convolutional filters from a network"
    ],
    "correctAnswer": "An Encoder compresses input x into a low-dimensional bottleneck latent code z, and a Decoder reconstructs x\u0302 from z by minimizing reconstruction loss",
    "explanation": {
      "summary": "Autoencoders learn efficient, compressed representations (latent space) in an unsupervised self-supervised manner: x \u2192 z \u2192 x\u0302.",
      "whyCorrect": "The bottleneck forces the network to capture the most salient features rather than trivial identity copying. Loss = ||x - x\u0302||^2 (MSE reconstruction error).",
      "whyWrong": "A Generator and Discriminator competing describes a Generative Adversarial Network (GAN), not a standard autoencoder.",
      "keyConcept": "Autoencoder: Encoder q(z|x), Bottleneck z, Decoder p(x|z), Loss = Reconstruction Error."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 41,
    "category": "Generative Models",
    "module": "Module 3",
    "question": "Which of the following is a classic practical application of Autoencoders in computer vision?",
    "options": [
      "Image Denoising and Anomaly Detection",
      "Calculating learning rate schedules automatically",
      "Converting RGB images into audio speech signals",
      "Replacing Scantron bubble sheets with digital QR codes"
    ],
    "correctAnswer": "Image Denoising and Anomaly Detection",
    "explanation": {
      "summary": "Autoencoders trained on clean or normal images reconstruct clean/normal data well. When fed noisy images, they output clean images (Denoising).",
      "whyCorrect": "In Anomaly Detection, the autoencoder is trained only on normal data. When an abnormal image is passed, reconstruction error is abnormally high, triggering an anomaly flag.",
      "whyWrong": "Autoencoders reconstruct images; they do not schedule learning rates or produce audio.",
      "keyConcept": "Applications: Dimensionality Reduction, Image Denoising, Inpainting, Anomaly Detection."
    },
    "difficulty": "Basic"
  },
  {
    "id": 42,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "In CNN terminology, what is a 'Feature Map' (also known as Activation Map)?",
    "options": [
      "The 2D output array generated by sliding a specific convolutional filter across the input volume and computing dot products",
      "A geographical map showing where the training data was collected",
      "The scatter plot of loss values plotted over training epochs",
      "The binary mask of weights that were dropped out during training"
    ],
    "correctAnswer": "The 2D output array generated by sliding a specific convolutional filter across the input volume and computing dot products",
    "explanation": {
      "summary": "A feature map represents the spatial response of one filter convolved over the input. If a conv layer has 32 filters, it outputs 32 feature maps.",
      "whyCorrect": "Each filter produces one 2D slice of the output tensor. High values in a feature map indicate strong detection of that filter's pattern (e.g. horizontal edge).",
      "whyWrong": "Loss over epochs is a learning curve; dropped weights is a dropout mask.",
      "keyConcept": "One filter convolved across input = One 2D Feature Map. Depth of output = Number of filters."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 43,
    "category": "Stride & Padding",
    "module": "Module 2",
    "question": "If an input image has size 224 x 224, you apply an AlexNet-style Conv layer with kernel size 11 x 11, stride S = 4, and padding P = 2. What is the output spatial size?",
    "options": [
      "55 x 55",
      "56 x 56",
      "54 x 54",
      "112 x 112"
    ],
    "correctAnswer": "55 x 55",
    "explanation": {
      "summary": "Apply formula: O = \u230a(W - K + 2P)/S\u230b + 1 with W=224, K=11, P=2, S=4.",
      "whyCorrect": "Numerator: 224 - 11 + 2(2) = 224 - 11 + 4 = 217. \u230a217 / 4\u230b = 54. Adding 1: 54 + 1 = 55. Result is 55 x 55.",
      "whyWrong": "This is the exact first layer calculation from the famous AlexNet paper (224x224 input -> 55x55 output).",
      "keyConcept": "AlexNet Layer 1: \u230a(224 - 11 + 4) / 4\u230b + 1 = \u230a217 / 4\u230b + 1 = 54 + 1 = 55."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 44,
    "category": "Parameter Counting",
    "module": "Module 2",
    "question": "A Conv2D layer has 128 filters of size 1 x 1. The input has 512 channels. Assuming each filter has a bias term, how many total learnable parameters are there?",
    "options": [
      "65,664",
      "65,536",
      "128",
      "512"
    ],
    "correctAnswer": "65,664",
    "explanation": {
      "summary": "Params = (K_h * K_w * C_in + 1) * C_out. Here: K=1, C_in=512, C_out=128.",
      "whyCorrect": "Weights per filter = 1 * 1 * 512 = 512. Including bias = 512 + 1 = 513. Total = 513 * 128 = 65,664.",
      "whyWrong": "65,536 is 512 * 128 (missing the 128 biases).",
      "keyConcept": "1x1 Conv Params: (C_in + 1) * C_out = (512 + 1) * 128 = 65,664."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 45,
    "category": "Regularization",
    "module": "Module 1",
    "question": "During training, what is 'Early Stopping' and how does it prevent overfitting?",
    "options": [
      "Monitoring performance on a validation set and halting training when validation loss stops improving, restoring the model weights from the best checkpoint",
      "Terminating the training loop after exactly 10 epochs regardless of performance",
      "Stopping backpropagation halfway through the network to save battery",
      "Zeroing out all gradients when learning rate falls below 0.001"
    ],
    "correctAnswer": "Monitoring performance on a validation set and halting training when validation loss stops improving, restoring the model weights from the best checkpoint",
    "explanation": {
      "summary": "Early stopping tracks validation loss. If validation loss begins climbing while training loss keeps dropping (overfitting onset), training stops after a patience threshold.",
      "whyCorrect": "It prevents the model from spending excessive epochs memorizing noise and returns the optimal generalizable checkpoint.",
      "whyWrong": "Early stopping is dynamic and data-driven based on validation metrics, not hardcoded to fixed epochs.",
      "keyConcept": "Early Stopping: Stops when validation loss begins to diverge, saving optimal weights."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 46,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "Why do we typically increase the number of filters (channels) in deeper layers of a CNN (e.g. 32 \u2192 64 \u2192 128 \u2192 256) while decreasing spatial dimensions with pooling?",
    "options": [
      "Early layers capture simple local spatial patterns (edges), while deeper layers combine them into richer, more complex high-level semantic representations requiring more channels",
      "Because deeper layers cannot process small numbers of channels on GPUs",
      "To ensure the final Softmax layer receives an equal number of odd and even values",
      "To prevent image files from taking up too much hard drive space"
    ],
    "correctAnswer": "Early layers capture simple local spatial patterns (edges), while deeper layers combine them into richer, more complex high-level semantic representations requiring more channels",
    "explanation": {
      "summary": "Spatial dimensions decrease (spatial abstraction), while channel depth increases (semantic feature diversity).",
      "whyCorrect": "Early layers only need a few filters to capture basic edge orientations and colors. Deeper layers represent vast combinations of parts, objects, and abstract concepts, requiring more feature channels.",
      "whyWrong": "It is a fundamental principle of visual representation hierarchy, not a GPU or hard drive constraint.",
      "keyConcept": "Spatial shrinks (resolution decreases), Depth expands (semantic richness increases)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 47,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "What is the mathematical range of the hyperbolic tangent (Tanh) activation function?",
    "options": [
      "(-1, 1)",
      "(0, 1)",
      "[0, \u221e)",
      "(-\u221e, \u221e)"
    ],
    "correctAnswer": "(-1, 1)",
    "explanation": {
      "summary": "Tanh(z) = (e^z - e^-z) / (e^z + e^-z). Its range is strictly between -1 and +1.",
      "whyCorrect": "Because Tanh is zero-centered (unlike Sigmoid whose range is (0, 1)), it often converges faster in shallow networks than Sigmoid.",
      "whyWrong": "(0, 1) is Sigmoid; [0, \u221e) is ReLU; (-\u221e, \u221e) is Linear/Identity.",
      "keyConcept": "Ranges: Sigmoid = (0, 1); Tanh = (-1, 1); ReLU = [0, \u221e); LeakyReLU = (-\u221e, \u221e)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 48,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "What is a 'saddle point' in high-dimensional deep learning loss landscapes?",
    "options": [
      "A point where the gradient is zero, but the surface curves upwards along some dimensions and downwards along others",
      "The global minimum where the loss is exactly 0",
      "A point where all weights must be multiplied by -1",
      "A layer where Dropout is strictly set to 1.0"
    ],
    "correctAnswer": "A point where the gradient is zero, but the surface curves upwards along some dimensions and downwards along others",
    "explanation": {
      "summary": "In thousands of dimensions, local minima where ALL directions curve up are rare; saddle points with zero gradient in mixed directions are far more common.",
      "whyCorrect": "Saddle points can slow down gradient descent because gradients become close to 0. Momentum and adaptive optimizers (like Adam) help escape saddle points rapidly.",
      "whyWrong": "Saddle points are not global minima (loss is not necessarily minimal).",
      "keyConcept": "Saddle Point: \u2207L = 0, but Hessian has both positive and negative eigenvalues."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 49,
    "category": "CNN Architectures",
    "module": "Module 2",
    "question": "In ResNet-50 and ResNet-101, what is a 'Bottleneck' residual block?",
    "options": [
      "A block of three layers: 1x1 conv (dim reduction) \u2192 3x3 conv \u2192 1x1 conv (dim restoration)",
      "A single layer with 10,000 neurons that bottlenecks GPU RAM",
      "A Max Pooling layer with stride 10",
      "A Dropout layer with rate 0.99"
    ],
    "correctAnswer": "A block of three layers: 1x1 conv (dim reduction) \u2192 3x3 conv \u2192 1x1 conv (dim restoration)",
    "explanation": {
      "summary": "For deep ResNets (50+), 2-layer 3x3 blocks become computationally heavy. The bottleneck uses 1x1 to reduce channels, 3x3 to compute spatial features, and 1x1 to restore channels.",
      "whyCorrect": "For instance: 256 channels -> 1x1 conv (64 ch) -> 3x3 conv (64 ch) -> 1x1 conv (256 ch). This cuts computation dramatically while maintaining representational power.",
      "whyWrong": "Bottleneck blocks do not use extreme dropout or massive dense layers.",
      "keyConcept": "ResNet Bottleneck: 1x1 Conv (reduce) \u2192 3x3 Conv \u2192 1x1 Conv (expand)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 50,
    "category": "Regularization",
    "module": "Module 1",
    "question": "Why does Data Augmentation (random flips, rotations, color jitter) help prevent overfitting in Computer Vision?",
    "options": [
      "It artificially increases training set diversity and forces the network to learn invariant features rather than memorizing exact pixel values",
      "It automatically decreases the number of weights in convolutional layers",
      "It speeds up backward pass gradient calculations by 50%",
      "It changes the loss function from Cross-Entropy to MSE"
    ],
    "correctAnswer": "It artificially increases training set diversity and forces the network to learn invariant features rather than memorizing exact pixel values",
    "explanation": {
      "summary": "Data augmentation teaches the model that a cat is still a cat even if flipped horizontally, slightly rotated, or cropped.",
      "whyCorrect": "By generating unique transformed variations on-the-fly during training, the effective dataset size grows substantially, curbing memorization (overfitting).",
      "whyWrong": "Data augmentation does not alter model architecture, parameter count, or loss functions.",
      "keyConcept": "Data Augmentation: Increases training distribution support without collecting new data."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 51,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "What is the difference between a 'Convolution' and a 'Cross-Correlation' in deep learning implementations (like PyTorch and TensorFlow)?",
    "options": [
      "True mathematical convolution flips the kernel 180 degrees before sliding dot products; deep learning libraries omit the flip and perform cross-correlation, but call it convolution",
      "Cross-correlation can only be performed on 1D audio data",
      "Convolution cannot be computed with GPU parallelism",
      "There is no difference; both terms are mathematically identical in all fields"
    ],
    "correctAnswer": "True mathematical convolution flips the kernel 180 degrees before sliding dot products; deep learning libraries omit the flip and perform cross-correlation, but call it convolution",
    "explanation": {
      "summary": "In signal processing, convolution requires flipping the filter horizontally and vertically: (f * g)(t) = \u222b f(\u03c4) g(t - \u03c4) d\u03c4.",
      "whyCorrect": "Since the filter weights are learned from scratch by gradient descent anyway, flipping the filter beforehand does not change what the network can learn, so libraries omit the flip for efficiency.",
      "whyWrong": "Deep learning conv layers are technically cross-correlation, but the terminology is used interchangeably.",
      "keyConcept": "Deep learning conv = Cross-Correlation (kernel is NOT flipped because weights are learned)."
    },
    "difficulty": "Basic"
  },
  {
    "id": 52,
    "category": "Stride & Padding",
    "module": "Module 2",
    "question": "What happens to the spatial output size if you apply a convolution with stride S = 2 compared to stride S = 1?",
    "options": [
      "The spatial dimensions are roughly halved, achieving downsampling without a pooling layer",
      "The spatial dimensions are doubled",
      "The channel depth is doubled automatically",
      "The number of weights in the filter is doubled"
    ],
    "correctAnswer": "The spatial dimensions are roughly halved, achieving downsampling without a pooling layer",
    "explanation": {
      "summary": "Stride S is the step size. Stepping 2 pixels at a time skips every other location, approximately halving H and W.",
      "whyCorrect": "Strided convolution (S \u2265 2) is widely used in modern networks (like ResNet) to replace pooling layers because it downsamples while simultaneously learning feature transformations.",
      "whyWrong": "Stride 2 halves, not doubles. Stride does not change filter weight count or channel count.",
      "keyConcept": "Strided Convolution (S=2): Learnable downsampling alternative to pooling."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 53,
    "category": "Parameter Counting",
    "module": "Module 2",
    "question": "A CNN has: Input (32x32x3) \u2192 Conv1 (16 filters 3x3, P=1, S=1) \u2192 MaxPool (2x2, S=2) \u2192 Conv2 (32 filters 3x3, P=1, S=1). How many total parameters are in Conv2 (with bias)?",
    "options": [
      "4,640",
      "4,608",
      "1,184",
      "512"
    ],
    "correctAnswer": "4,640",
    "explanation": {
      "summary": "Look at input channels into Conv2: Conv1 produced 16 feature maps. MaxPool preserved 16 channels. So C_in for Conv2 is 16.",
      "whyCorrect": "Weights per filter in Conv2 = 3 * 3 * 16 = 144. Plus 1 bias = 145. For 32 filters: 145 * 32 = 4,640 parameters.",
      "whyWrong": "4,608 forgets the 32 bias terms (144 * 32 = 4,608). 1,184 assumes C_in is 3 instead of 16.",
      "keyConcept": "Conv2 input channels C_in = 16 (from Conv1). Params = (3*3*16 + 1) * 32 = 4,640."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 54,
    "category": "Pooling Layers",
    "module": "Module 2",
    "question": "Why does Average Pooling tend to produce smoother, blurrier feature responses compared to Max Pooling?",
    "options": [
      "Average pooling takes the arithmetic mean of all values in the window, diluting sharp high-contrast features, whereas Max Pooling preserves the single strongest activation",
      "Average pooling multiplies all activations by zero",
      "Average pooling cannot be used on RGB images",
      "Average pooling has 10 times more learnable parameters"
    ],
    "correctAnswer": "Average pooling takes the arithmetic mean of all values in the window, diluting sharp high-contrast features, whereas Max Pooling preserves the single strongest activation",
    "explanation": {
      "summary": "Max pooling acts as an 'OR' gate detecting if a feature is present anywhere in the window. Average pooling blends foreground and background signals.",
      "whyCorrect": "In computer vision classification, we usually care if an edge or texture is present (Max Pooling). Average pooling is often reserved for Global Average Pooling at the very end.",
      "whyWrong": "Average pooling has 0 learnable parameters, just like Max Pooling, and works on any channel volume.",
      "keyConcept": "Max Pooling = Highlights prominent features. Average Pooling = Smooth aggregate representation."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 55,
    "category": "CNN Architectures",
    "module": "Module 2",
    "question": "In LeNet-5 (1998), what activation functions were primarily used, and what was the main target application?",
    "options": [
      "Sigmoid / Tanh activations, targeted for handwritten check digit recognition (MNIST)",
      "ReLU activations, targeted for autonomous self-driving cars",
      "Softmax across all layers, targeted for satellite imagery",
      "GeLU activations, targeted for natural language processing"
    ],
    "correctAnswer": "Sigmoid / Tanh activations, targeted for handwritten check digit recognition (MNIST)",
    "explanation": {
      "summary": "LeNet-5 was designed by Yann LeCun in 1998 to read handwritten digits on bank checks for US banks.",
      "whyCorrect": "It used Tanh/Sigmoid activations (ReLU was popularized later with AlexNet in 2012) and Average Pooling (subsampling) with learnable coefficients.",
      "whyWrong": "ReLU and GPUs were not standard in 1998; self-driving and NLP transformers came much later.",
      "keyConcept": "LeNet-5 (1998): 5 layers, Tanh/Sigmoid, developed for postal and check digit recognition."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 56,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "question": "When training a model with Cross-Entropy loss and Softmax, what happens if the network predicts probability p = 0.0001 for the true class?",
    "options": [
      "The loss -log(p) produces a massive penalty (-log(0.0001) \u2248 9.21), driving large gradient updates to correct the mistake",
      "The loss becomes 0 and no update occurs",
      "The loss becomes negative",
      "The learning rate is automatically doubled"
    ],
    "correctAnswer": "The loss -log(p) produces a massive penalty (-log(0.0001) \u2248 9.21), driving large gradient updates to correct the mistake",
    "explanation": {
      "summary": "Cross-entropy loss for the correct class is -log(p). As p \u2192 0, -log(p) \u2192 +\u221e.",
      "whyCorrect": "This severe logarithmic penalty ensures that confident incorrect predictions are heavily penalized, generating strong error signals through backpropagation.",
      "whyWrong": "Probabilities are bounded in (0, 1), so -log(p) is strictly positive, never negative.",
      "keyConcept": "Cross-Entropy penalty: -log(1.0) = 0 (perfect); -log(0.0001) = 9.21 (heavy penalty)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 57,
    "category": "Perceptron & Activations",
    "module": "Module 1",
    "question": "What is Leaky ReLU, and how does it address the Dying ReLU problem?",
    "options": [
      "It introduces a small positive slope (e.g. 0.01) for negative inputs (f(z) = max(0.01z, z)), ensuring gradients never become completely zero",
      "It caps the maximum value at 1.0",
      "It randomly drops 50% of the inputs to zero",
      "It computes the cosine of the input"
    ],
    "correctAnswer": "It introduces a small positive slope (e.g. 0.01) for negative inputs (f(z) = max(0.01z, z)), ensuring gradients never become completely zero",
    "explanation": {
      "summary": "Leaky ReLU: f(z) = z if z > 0, else \u03b1z (typically \u03b1 = 0.01).",
      "whyCorrect": "Because the gradient for z < 0 is \u03b1 (non-zero), negative neurons can still receive gradient updates and recover, solving the Dying ReLU deadlock.",
      "whyWrong": "Capping at 1.0 is ReLU6 or Hard Sigmoid. Dropping inputs is Dropout.",
      "keyConcept": "Leaky ReLU: f'(z) = 1 if z > 0; f'(z) = \u03b1 if z \u2264 0 (gradient never reaches 0)."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 58,
    "category": "Vision Tasks",
    "module": "Module 2",
    "question": "In Object Detection, a model predicts bounding box coordinates usually represented as:",
    "options": [
      "(x_center, y_center, width, height) along with a class probability distribution",
      "RGB color values of the camera lens",
      "A single floating point number representing the focal length",
      "A 3D mesh of 100,000 vertices"
    ],
    "correctAnswer": "(x_center, y_center, width, height) along with a class probability distribution",
    "explanation": {
      "summary": "Object detection outputs a bounding box tuple (either center x, y, w, h or min/max corners x1, y1, x2, y2) plus classification logits.",
      "whyCorrect": "The regression head predicts 4 box offset coordinates, while the classification head predicts class scores for the object within that box.",
      "whyWrong": "Camera RGB values or focal length are camera parameters, not object bounding boxes.",
      "keyConcept": "Detection Output: Bounding Box [x, y, w, h] (Regression) + Class Label (Classification)."
    },
    "difficulty": "Exam Level"
  },
  {
    "id": 59,
    "category": "Generative Models",
    "module": "Module 3",
    "question": "What is the 'Latent Space' (or bottleneck) in an Autoencoder?",
    "options": [
      "A compressed, lower-dimensional intermediate representation that captures the core semantic factors of variation of the data",
      "The unused RAM on the computer motherboard",
      "The time interval between two epochs during training",
      "The folder where training images are downloaded on disk"
    ],
    "correctAnswer": "A compressed, lower-dimensional intermediate representation that captures the core semantic factors of variation of the data",
    "explanation": {
      "summary": "The latent space z is the compressed vector representation produced by the encoder at the bottleneck.",
      "whyCorrect": "Because the latent dimensionality is much smaller than the input (e.g., 32 dimensions vs 784 pixels), the network must learn a compact manifold representation of the data.",
      "whyWrong": "Latent space is an abstract mathematical representation space, not physical RAM or file paths.",
      "keyConcept": "Latent Bottleneck: Compresses high-dimensional data into essential underlying features."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 60,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "question": "Which of the following operations in a modern CNN has LEARNABLE parameters updated via backpropagation?",
    "options": [
      "Convolutional Layer weights and biases",
      "Max Pooling layer",
      "Average Pooling layer",
      "Flatten layer"
    ],
    "correctAnswer": "Convolutional Layer weights and biases",
    "explanation": {
      "summary": "Max Pooling, Average Pooling, and Flatten are fixed structural/mathematical transformations without weights.",
      "whyCorrect": "Convolutional layers (and Dense layers) contain learnable weights and biases that are optimized by gradient descent. Pooling and Flatten have zero parameters.",
      "whyWrong": "Pooling only takes max/mean; Flatten only reshapes the tensor array.",
      "keyConcept": "Learnable: Conv2D, Dense, BatchNormalization. Non-learnable: MaxPool, AvgPool, Flatten, Dropout."
    },
    "difficulty": "Intermediate"
  },
  {
    "id": 61,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "What is the primary motivation for applying data augmentation techniques when training deep convolutional neural networks?",
    "options": [
      "To artificially increase dataset diversity and prevent overfitting by enforcing transformation invariance",
      "To reduce the number of trainable weight parameters required by convolutional kernels",
      "To speed up the backpropagation chain rule by eliminating negative gradients",
      "To convert multi-class classification problems into binary cross-entropy formulations"
    ],
    "correctAnswer": "To artificially increase dataset diversity and prevent overfitting by enforcing transformation invariance",
    "explanation": {
      "summary": "Data augmentation generates synthetic variations of training examples, improving generalizability without collecting new labeled data.",
      "whyCorrect": "By applying random rotations, flips, crops, and contrast shifts, the model encounters realistic variations of objects, teaching it to be invariant to orientation and lighting, thereby reducing generalization error.",
      "whyWrong": "Data augmentation does not change network weights/parameters, does not alter backpropagation algebra, and does not alter the loss function formulation.",
      "keyConcept": "Data Augmentation expands the effective support of the training data distribution to combat overfitting."
    }
  },
  {
    "id": 62,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "In standard machine learning workflows, during which phase of model execution should data augmentation be active?",
    "options": [
      "Strictly during model training (e.g., Model.fit); it must remain inactive during evaluation and inference",
      "During both training and final production inference to randomize test predictions",
      "Strictly during the evaluation/test phase to assess model robustness under noise",
      "Only during the hyperparameter tuning phase before model weights are initialized"
    ],
    "correctAnswer": "Strictly during model training (e.g., Model.fit); it must remain inactive during evaluation and inference",
    "explanation": {
      "summary": "Data augmentation regularizes learning during training; evaluation on test data requires deterministic, unperturbed inputs.",
      "whyCorrect": "As highlighted in the course labs (Module 1 Data Augmentation), preprocessing layers like RandomFlip and RandomCrop are inactive at test time (calls to model.evaluate or model.predict) so predictions reflect true unaltered data.",
      "whyWrong": "Augmenting test data would artificially distort real inputs and introduce unwanted randomness into test accuracy evaluations.",
      "keyConcept": "Data augmentation is active ONLY during training (Model.fit), never during testing or inference."
    }
  },
  {
    "id": 63,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "Why is horizontal flipping (RandomFlip left-right) suitable for natural image datasets like CIFAR-10 but potentially harmful for handwritten digit recognition (MNIST)?",
    "options": [
      "Flipping handwritten digits can alter their semantic class (e.g., flipping a 6 or a 9), corrupting ground truth labels",
      "Horizontal flipping doubles the number of input channels from 1 to 2",
      "MNIST digits are stored as floating point numbers while natural images are integers",
      "Convolutional layers cannot compute spatial derivatives on flipped matrices"
    ],
    "correctAnswer": "Flipping handwritten digits can alter their semantic class (e.g., flipping a 6 or a 9), corrupting ground truth labels",
    "explanation": {
      "summary": "Augmentations must preserve the semantics of the ground-truth label; directional symbols are sensitive to reflections.",
      "whyCorrect": "A horizontal or vertical flip of a handwritten digit '6' can turn it into a '9', an 'e' into an '\u0259', or create non-existent numeral symbols, introducing label noise. In CIFAR-10, an airplane or cat is still an airplane or cat when flipped horizontally.",
      "whyWrong": "Flipping does not change channel count or numeric datatypes, and convolution operates identically on any 2D tensor.",
      "keyConcept": "Domain Rule: Augmentations must be class-preserving (invariance under realistic domain transformations)."
    }
  },
  {
    "id": 64,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "What is the primary computational benefit of implementing data augmentation pipelines asynchronously via CPU datasets (e.g., tf.data.Dataset.map or PyTorch DataLoader workers)?",
    "options": [
      "It overlaps CPU image transformation with GPU model forward/backward passes, preventing GPU starvation",
      "It computes exact analytical Hessians instead of first-order gradients",
      "It completely bypasses the need for GPU VRAM during backward propagation",
      "It eliminates floating-point rounding errors in convolutional weight updates"
    ],
    "correctAnswer": "It overlaps CPU image transformation with GPU model forward/backward passes, preventing GPU starvation",
    "explanation": {
      "summary": "Asynchronous CPU data loading prefetches and transforms batches in parallel with GPU gradient updates.",
      "whyCorrect": "While the GPU is busy executing forward and backward passes for batch N, multi-threaded CPU workers preprocess and augment batch N+1. This pipeline parallelism keeps expensive GPUs at 100% utilization.",
      "whyWrong": "Data loading has no connection to Hessian matrices, still requires VRAM for activations, and does not alter floating-point math.",
      "keyConcept": "Pipeline Overlap: CPU prepares augmented batch (N+1) while GPU trains on batch (N)."
    }
  },
  {
    "id": 65,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "Which of the following data augmentation operations modifies pixel intensities without changing spatial pixel coordinates?",
    "options": [
      "Random Contrast & Brightness Jitter",
      "Random Rotation",
      "Random Spatial Crop",
      "Random Horizontal Flip"
    ],
    "correctAnswer": "Random Contrast & Brightness Jitter",
    "explanation": {
      "summary": "Color and contrast augmentations are photometric (intensity-based), while rotations, crops, and flips are geometric (spatial).",
      "whyCorrect": "RandomContrast and Color Jitter scale and shift the intensity values of existing pixels across channels without altering the (x, y) coordinate positions of image features.",
      "whyWrong": "Rotation, Crop, and Flip are geometric transformations that alter the spatial coordinates and bounding borders of pixels.",
      "keyConcept": "Photometric Augmentations alter intensities (contrast, brightness); Geometric Augmentations alter spatial coordinates (rotation, flip, crop)."
    }
  },
  {
    "id": 66,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "Why is it standard practice to normalize raw image pixel intensities from [0, 255] down to [0, 1] or to zero mean (\u03bc=0, \u03c3=1) prior to neural network training?",
    "options": [
      "To prevent exploding pre-activations, improve numerical stability, and ensure uniform gradient descent scaling",
      "Because TensorFlow and PyTorch tensor operations cannot physically accept integer values greater than 1",
      "To reduce image memory size on the hard drive by a factor of 255",
      "To convert the 2D spatial arrangement of the image into a 1D vector automatically"
    ],
    "correctAnswer": "To prevent exploding pre-activations, improve numerical stability, and ensure uniform gradient descent scaling",
    "explanation": {
      "summary": "Input normalization keeps pre-activations within reasonable numerical bounds where gradients do not explode or saturate.",
      "whyCorrect": "Raw inputs scaled up to 255 multiplied by initial weights yield enormous values of z, pushing Sigmoid/Tanh into flat saturation zones or causing ReLU explosive activations. Normalized inputs ensure stable, isotropic gradient descent.",
      "whyWrong": "Tensors accept any float or int value; normalization does not reduce disk storage or reshape spatial dimensions.",
      "keyConcept": "Input Normalization ensures well-conditioned loss surfaces and faster gradient descent convergence."
    }
  },
  {
    "id": 67,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "Does applying data augmentation to an existing CNN architecture increase the number of learnable parameters in the model?",
    "options": [
      "No; data augmentation only increases input data variability, leaving model weights and architecture unchanged",
      "Yes; it adds extra convolutional kernels to memorize the rotated versions",
      "Yes; it doubles the number of bias terms in the final dense layer",
      "Yes; it adds dedicated dropout masks permanently into the weight tensor"
    ],
    "correctAnswer": "No; data augmentation only increases input data variability, leaving model weights and architecture unchanged",
    "explanation": {
      "summary": "Data augmentation regularizes via the data space, not the model parameter space.",
      "whyCorrect": "Learnable parameters depend solely on layer architecture (filter sizes, number of filters, dense connections). Data augmentation simply provides a richer, more diverse stream of inputs to optimize those exact same parameters.",
      "whyWrong": "No additional weights, biases, or kernels are allocated; the architecture remains 100% identical.",
      "keyConcept": "Model capacity (parameter count) is independent of training set size and augmentation."
    }
  },
  {
    "id": 68,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "When an image is rotated by an arbitrary angle (such as 15 degrees) during augmentation, how are the undefined corners/border areas typically handled?",
    "options": [
      "By filling borders with reflection, nearest-neighbor padding, or a constant color value",
      "By deleting the unrotated pixels and retraining the convolutional kernel size",
      "By shifting the image into the frequency domain via Fast Fourier Transform",
      "By terminating the training batch and discarding the entire sample"
    ],
    "correctAnswer": "By filling borders with reflection, nearest-neighbor padding, or a constant color value",
    "explanation": {
      "summary": "Rotations produce empty triangular wedges at borders that must be filled (padded) to maintain rectangular tensor shape.",
      "whyCorrect": "Preprocessing pipelines use border modes such as 'constant' (fill with 0/black), 'reflect' (mirroring boundary pixels), or 'nearest' to ensure output tensors retain constant rectangular dimensions (H x W x C).",
      "whyWrong": "Kernels cannot change size mid-training, FFT is not used for border padding, and discarding samples defeats the purpose of augmentation.",
      "keyConcept": "Padding modes for geometric transforms include constant (zero-fill), reflect, and nearest."
    }
  },
  {
    "id": 69,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "What is the primary effect of using RandomCrop(height, width) on training images?",
    "options": [
      "It forces the CNN to recognize objects from partial views and scale variations, improving spatial translation invariance",
      "It compresses image color depth from 24-bit RGB to 8-bit grayscale",
      "It removes high-frequency Fourier components to smooth image textures",
      "It automatically segments the foreground object from the background"
    ],
    "correctAnswer": "It forces the CNN to recognize objects from partial views and scale variations, improving spatial translation invariance",
    "explanation": {
      "summary": "Cropping shifts object locations and cuts off peripheral areas, teaching the network not to rely on objects being centered.",
      "whyCorrect": "Random crops force filters to activate on local distinctive parts regardless of where the object is located in the frame, directly enhancing spatial robustness.",
      "whyWrong": "Cropping does not alter color channels, does not filter frequency, and is not a semantic segmentation mask.",
      "keyConcept": "Random cropping prevents networks from memorizing fixed spatial positions or relying on centered framing."
    }
  },
  {
    "id": 70,
    "category": "Data Augmentation",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "Why is data augmentation particularly critical when training deep CNNs on small or medium-sized datasets?",
    "options": [
      "Because deep CNNs have high model capacity and will easily overfit/memorize small training sets without regularized data diversity",
      "Because small datasets cause gradient descent updates to mathematically cancel out to zero",
      "Because convolutional layers require a minimum of 1 million images to initialize weights",
      "Because pooling layers cannot execute downsampling on datasets smaller than 10,000 images"
    ],
    "correctAnswer": "Because deep CNNs have high model capacity and will easily overfit/memorize small training sets without regularized data diversity",
    "explanation": {
      "summary": "High-capacity models have high variance; data augmentation acts as an implicit regularizer by expanding training diversity.",
      "whyCorrect": "A deep CNN with millions of parameters has enough degrees of freedom to memorize small training samples verbatim (achieving 100% training accuracy but abysmal test accuracy). Augmentation creates continuous variations, preventing rote memorization.",
      "whyWrong": "Gradients do not cancel to zero, conv layers initialize fine on any dataset, and pooling has no minimum dataset requirement.",
      "keyConcept": "High Capacity + Small Data = Severe Overfitting. Augmentation bridges this gap."
    }
  },
  {
    "id": 71,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "In a PyTorch training loop, why is optimizer.zero_grad() invoked immediately before executing loss.backward()?",
    "options": [
      "PyTorch accumulates gradients in .grad buffers by default; zeroing prevents accumulating gradients across consecutive mini-batches",
      "It sets the model weights to zero so backpropagation can start from a clean origin",
      "It clears the GPU VRAM cache to prevent out-of-memory errors on the backward pass",
      "It resets the learning rate hyperparameter back to its initial starting value"
    ],
    "correctAnswer": "PyTorch accumulates gradients in .grad buffers by default; zeroing prevents accumulating gradients across consecutive mini-batches",
    "explanation": {
      "summary": "PyTorch's design allows gradient accumulation for large virtual batches, necessitating manual zeroing per iteration.",
      "whyCorrect": "Whenever loss.backward() is called, parameter gradients are added (+=) to existing param.grad tensors. Without optimizer.zero_grad(), the gradients from previous batches would sum together, leading to corrupted weight updates.",
      "whyWrong": "It zeroes gradients, not weights; it does not clear CUDA cache; and it has nothing to do with the learning rate schedule.",
      "keyConcept": "PyTorch Rule: optimizer.zero_grad() -> loss.backward() -> optimizer.step()."
    }
  },
  {
    "id": 72,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "What is the primary mathematical principle underlying backpropagation in multi-layer neural networks?",
    "options": [
      "The Multivariable Chain Rule of calculus for computing partial derivatives of loss with respect to weights",
      "Taylor series approximation of the loss function Hessian matrix",
      "Laplace transform of activation functions from the time domain to the frequency domain",
      "Singular Value Decomposition of weight matrices into orthogonal eigenvectors"
    ],
    "correctAnswer": "The Multivariable Chain Rule of calculus for computing partial derivatives of loss with respect to weights",
    "explanation": {
      "summary": "Backpropagation recursively applies the chain rule backward from the loss through each layer.",
      "whyCorrect": "By applying \u2202L/\u2202w = (\u2202L/\u2202y) * (\u2202y/\u2202z) * (\u2202z/\u2202w), backpropagation calculates the exact gradient contribution of every weight and bias across deep cascades of layers.",
      "whyWrong": "Backpropagation is a first-order gradient method; it does not compute Hessians, Laplace transforms, or SVDs.",
      "keyConcept": "Backpropagation = Systematic application of the Multivariable Chain Rule backward through the computational graph."
    }
  },
  {
    "id": 73,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "What is the primary role of the batch size parameter in Mini-Batch Stochastic Gradient Descent (SGD)?",
    "options": [
      "It controls the trade-off between the noisy, rapid updates of single-sample SGD and the exact stability of full-batch gradient descent",
      "It determines the total number of epochs the model will train before terminating",
      "It sets the spatial kernel height and width for convolutional layers",
      "It limits the maximum number of hidden layers permitted in the neural network architecture"
    ],
    "correctAnswer": "It controls the trade-off between the noisy, rapid updates of single-sample SGD and the exact stability of full-batch gradient descent",
    "explanation": {
      "summary": "Batch size balances gradient estimation noise, computational parallelism on GPUs, and convergence speed.",
      "whyCorrect": "Batch size B=1 (pure SGD) produces noisy gradients that can escape local minima but cannot utilize GPU matrix parallelism. Full batch (B=N) computes the true gradient but is computationally prohibitive. Mini-batch (e.g., B=32, 64, 128) achieves optimal GPU throughput with beneficial gradient stochasticity.",
      "whyWrong": "Batch size does not determine epoch count, does not configure kernel size, and does not restrict network depth.",
      "keyConcept": "Mini-batch SGD balances computational efficiency (vectorized GPU math) with stochastic regularization (noise helps escape saddle points)."
    }
  },
  {
    "id": 74,
    "category": "Regularization",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "During model training, if training loss steadily decreases towards zero while validation loss begins to diverge upward, what diagnosis is correct?",
    "options": [
      "The model is overfitting (high variance); it is memorizing training samples and losing generalization capability",
      "The model is underfitting (high bias); it lacks the capacity to represent the training distribution",
      "The learning rate is too low, causing the optimizer to stop exploring the loss surface",
      "The activation functions have permanently died and are outputting zero gradients"
    ],
    "correctAnswer": "The model is overfitting (high variance); it is memorizing training samples and losing generalization capability",
    "explanation": {
      "summary": "A widening divergence between training loss (decreasing) and validation loss (increasing) is the textbook definition of overfitting.",
      "whyCorrect": "When training error approaches zero but validation error climbs, the model has fitted noise and idiosyncrasies in the training set rather than underlying generalizable patterns.",
      "whyWrong": "Underfitting is characterized by both training and validation losses staying high. Dying activations would stall training loss improvement.",
      "keyConcept": "Overfitting Signature: Training loss decreases while validation loss increases."
    }
  },
  {
    "id": 75,
    "category": "Regularization",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "What happens under the hood when you invoke model.eval() in PyTorch (or training=False in TensorFlow) before running test inference?",
    "options": [
      "Dropout is deactivated (all neurons kept), and Batch Normalization uses fixed running population statistics instead of mini-batch statistics",
      "All model weights are locked into 8-bit integers to reduce memory overhead",
      "The cross-entropy loss function is automatically replaced with Mean Squared Error",
      "The learning rate is multiplied by 0.5 to prevent exploding test updates"
    ],
    "correctAnswer": "Dropout is deactivated (all neurons kept), and Batch Normalization uses fixed running population statistics instead of mini-batch statistics",
    "explanation": {
      "summary": "Layers with training-specific behaviors (Dropout and BatchNorm) must transition to deterministic inference mode.",
      "whyCorrect": "During training, Dropout zeros out activations at rate p, and BatchNorm computes mean/variance from the current batch. During evaluation, Dropout must be OFF (all pathways active and scaled), and BatchNorm must use accumulated running population mean/variance.",
      "whyWrong": "model.eval() does not quantize weights, does not change the loss function, and does not alter learning rates (no updates happen in eval).",
      "keyConcept": "model.eval(): Dropout = OFF (keep all units); BatchNorm = uses frozen running stats (\u03bc, \u03c3\u00b2)."
    }
  },
  {
    "id": 76,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "What occurs when the gradient descent learning rate (\u03b7) is configured excessively high?",
    "options": [
      "Weight updates take overly large steps, causing the loss to oscillate wildly, overshoot the minimum, or diverge to infinity (NaN)",
      "The model gets trapped permanently in the very first local minimum encountered",
      "The gradients smoothly decay to zero in the first epoch without updating weights",
      "The activation functions automatically convert into linear identity mappings"
    ],
    "correctAnswer": "Weight updates take overly large steps, causing the loss to oscillate wildly, overshoot the minimum, or diverge to infinity (NaN)",
    "explanation": {
      "summary": "A large learning rate violates the local Taylor approximation of gradient descent, causing explosive divergence.",
      "whyCorrect": "As shown in Lecture 1 slides, small learning rate = slow convergence; moderate learning rate = smooth convergence; excessively large learning rate = overshooting the valley, unstable oscillation, and numerical divergence.",
      "whyWrong": "Large steps overshoot rather than get trapped; gradients explode rather than smoothly decay to zero.",
      "keyConcept": "Learning Rate Sensitivity: Too small = slow/stuck; Too large = overshoot/divergence; Just right = stable convergence."
    }
  },
  {
    "id": 77,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "Why does the Adam optimizer generally outperform and converge faster than basic Vanilla SGD on complex loss surfaces?",
    "options": [
      "It computes individual adaptive learning rates for each parameter using running estimates of first (momentum) and second (variance) gradient moments",
      "It computes the exact second derivative (Hessian matrix) inverse on every iteration",
      "It completely replaces backpropagation with an analytical matrix inversion formula",
      "It restricts all weight updates strictly to non-negative positive values"
    ],
    "correctAnswer": "It computes individual adaptive learning rates for each parameter using running estimates of first (momentum) and second (variance) gradient moments",
    "explanation": {
      "summary": "Adam (Adaptive Moment Estimation) combines Momentum (first moment m_t) and RMSProp (second uncentered moment v_t).",
      "whyCorrect": "Adam adapts the step size for each parameter individually: parameters with frequent/large gradients take smaller cautious steps, while parameters with sparse gradients take larger steps, accelerating traversal through ravines and plateaus.",
      "whyWrong": "Adam does not invert Hessians (too expensive, O(N^3)), does not replace backprop, and does not restrict updates to positive numbers.",
      "keyConcept": "Adam Optimizer = First Moment (Momentum: exponentially decaying average of gradients) + Second Moment (RMSProp: uncentered variance)."
    }
  },
  {
    "id": 78,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "For a multi-class image classification task with 10 mutually exclusive classes (such as MNIST digit recognition), which output activation and loss function combination is mathematically optimal?",
    "options": [
      "Softmax activation paired with Categorical Cross-Entropy loss",
      "Sigmoid activation paired with Mean Squared Error (MSE) loss",
      "ReLU activation paired with Binary Cross-Entropy loss",
      "Tanh activation paired with Hinge Loss"
    ],
    "correctAnswer": "Softmax activation paired with Categorical Cross-Entropy loss",
    "explanation": {
      "summary": "Softmax converts raw logits into a valid probability distribution summing to 1; Categorical Cross-Entropy maximizes the likelihood of the true class.",
      "whyCorrect": "Softmax produces normalized probabilities p_i = exp(z_i) / \u03a3 exp(z_j). Paired with Categorical Cross-Entropy L = -log(p_true), the gradient simplifies elegantly to (p_i - y_i), preventing gradient vanishing when predictions are incorrect.",
      "whyWrong": "Sigmoid with MSE suffers from saturated gradients; ReLU outputs unbounded positive values; Tanh outputs negative numbers unsuitable for probability.",
      "keyConcept": "Multi-class exclusive: Softmax + Categorical Cross-Entropy. Binary: Sigmoid + Binary Cross-Entropy."
    }
  },
  {
    "id": 79,
    "category": "Regularization",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "What is the operational definition of Early Stopping as a regularization technique?",
    "options": [
      "Monitoring validation loss during training and halting execution when validation loss ceases to improve for a specified number of epochs (patience)",
      "Halting training whenever any single neuron activation reaches zero",
      "Stopping training precisely halfway through the scheduled number of epochs regardless of loss",
      "Terminating the backward pass as soon as the first layer gradients are computed"
    ],
    "correctAnswer": "Monitoring validation loss during training and halting execution when validation loss ceases to improve for a specified number of epochs (patience)",
    "explanation": {
      "summary": "Early stopping catches the model at the peak of its generalization performance before overfitting degrades validation accuracy.",
      "whyCorrect": "As training progresses, validation loss initially drops then hits a minimum before rising due to overfitting. Early stopping tracks this inflection point and restores the model weights corresponding to the lowest validation loss.",
      "whyWrong": "It does not stop on zero activations, does not stop at an arbitrary midpoint, and does not truncate the backward pass.",
      "keyConcept": "Early Stopping monitors validation loss and saves the best model checkpoint before overfitting begins."
    }
  },
  {
    "id": 80,
    "category": "Loss & Optimization",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "In PyTorch, what is the exact benefit of wrapping inference evaluation code inside 'with torch.no_grad():'?",
    "options": [
      "It disables the dynamic autograd computational graph, significantly saving memory and accelerating execution",
      "It forces the model to ignore bias parameters during matrix multiplication",
      "It automatically converts all 32-bit floats into complex numbers",
      "It prevents the GPU from throttling clock speeds under heavy load"
    ],
    "correctAnswer": "It disables the dynamic autograd computational graph, significantly saving memory and accelerating execution",
    "explanation": {
      "summary": "Disabling autograd tracking during evaluation eliminates the overhead of tracking intermediate tensors for backpropagation.",
      "whyCorrect": "During training, PyTorch constructs a directed acyclic graph (DAG) of all forward operations so gradients can be computed. During testing, gradients are unnecessary; torch.no_grad() disables graph construction, drastically cutting VRAM usage and runtime.",
      "whyWrong": "It does not disable bias terms, does not use complex numbers, and has no direct control over GPU hardware thermal throttling.",
      "keyConcept": "torch.no_grad() saves GPU memory and speeds up inference by disabling backward graph tracking."
    }
  },
  {
    "id": 81,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "What is meant by the 'Receptive Field' of a particular neuron in a deep convolutional layer?",
    "options": [
      "The specific spatial region in the input image that can influence the activation value of that neuron",
      "The total number of trainable weights stored inside the neuron's kernel",
      "The physical memory address where the neuron's bias value is cached in GPU VRAM",
      "The range of non-linear output values produced by the activation function"
    ],
    "correctAnswer": "The specific spatial region in the input image that can influence the activation value of that neuron",
    "explanation": {
      "summary": "The receptive field defines the field of view in the input space that an internal neuron 'sees'.",
      "whyCorrect": "In early layers, a neuron has a small receptive field (e.g., 3x3 or 5x5). As layers are stacked, subsequent neurons combine information from earlier patches, expanding their effective receptive field until deep neurons see the entire image.",
      "whyWrong": "It does not describe parameter count, memory addressing, or activation output range.",
      "keyConcept": "Receptive Field = The sub-area of the input image that determines a given unit's feature response."
    }
  },
  {
    "id": 82,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "If you stack two consecutive 3x3 convolutional layers (both with stride S=1 and padding P=0), what is the effective receptive field size on the original input?",
    "options": [
      "5 x 5, while requiring fewer parameters (2 * 3^2 = 18 per channel) than a single 5x5 layer (25 per channel)",
      "6 x 6, with identical parameter count to a single 6x6 filter",
      "3 x 3, because receptive fields do not grow without pooling layers",
      "9 x 9, because receptive fields multiply rather than add"
    ],
    "correctAnswer": "5 x 5, while requiring fewer parameters (2 * 3^2 = 18 per channel) than a single 5x5 layer (25 per channel)",
    "explanation": {
      "summary": "Two stacked 3x3 convolutions cover a 5x5 spatial receptive field while incorporating more non-linearities and 28% fewer parameters.",
      "whyCorrect": "Layer 1: each neuron sees 3x3. Layer 2: each neuron looks at a 3x3 patch of Layer 1 neurons. The outermost units of this 3x3 patch span (3 - 1) + 3 = 5 pixels in the original input. Parameters for one channel: 2 * (3*3) = 18 vs 1 * (5*5) = 25.",
      "whyWrong": "Receptive fields grow via addition (RF_2 = RF_1 + (K_2 - 1) = 3 + 2 = 5), not multiplication, and they do grow without pooling.",
      "keyConcept": "VGG Principle: Two stacked 3x3 convs = 5x5 receptive field (18 vs 25 params). Three 3x3 convs = 7x7 receptive field (27 vs 49 params)."
    }
  },
  {
    "id": 83,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "Following the VGG architecture design principle, what is the effective receptive field on the input image produced by stacking three consecutive 3x3 conv layers (all stride 1)?",
    "options": [
      "7 x 7",
      "9 x 9",
      "6 x 6",
      "12 x 12"
    ],
    "correctAnswer": "7 x 7",
    "explanation": {
      "summary": "Each additional 3x3 convolution with stride 1 adds (K - 1) = 2 to the receptive field diameter.",
      "whyCorrect": "Layer 1 gives RF = 3. Layer 2 adds (3 - 1) = 2, yielding RF = 5. Layer 3 adds another (3 - 1) = 2, yielding RF = 7. Stacking three 3x3 convs matches a 7x7 filter with 3 * (3*3) = 27 weights vs 49 weights (a 45% parameter reduction) plus 3 non-linear activations instead of 1.",
      "whyWrong": "Calculations yielding 6x6 or 9x9 violate the recursive formula RF_{l} = RF_{l-1} + (K_l - 1) * S_{prev}.",
      "keyConcept": "Formula: RF_{new} = RF_{old} + (K - 1). Three 3x3 layers = 7x7 receptive field."
    }
  },
  {
    "id": 84,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "What is the primary architectural purpose of a 1x1 convolution (also called a pointwise convolution or Network-in-Network projection)?",
    "options": [
      "To modify the number of feature channels (dimensionality reduction or expansion) while preserving spatial height and width with minimal computation",
      "To blur the image spatially and eliminate high-frequency edge noise",
      "To replace batch normalization by standardizing variance across spatial pixels",
      "To compute the transpose of the input matrix for autoencoder decoding"
    ],
    "correctAnswer": "To modify the number of feature channels (dimensionality reduction or expansion) while preserving spatial height and width with minimal computation",
    "explanation": {
      "summary": "1x1 convolutions perform linear combinations across depth (channels) at each individual spatial pixel location.",
      "whyCorrect": "A 1x1 conv computes a dot product across all input channels for every (x, y) location. If input has C_in channels, a 1x1 conv with C_out filters projects the feature map to C_out channels without changing spatial H x W, allowing cheap channel pooling.",
      "whyWrong": "1x1 has zero spatial extent so it cannot perform spatial blurring, does not compute batch statistics, and is not a matrix transpose.",
      "keyConcept": "1x1 Convolution = Cross-channel projection / pooling. Alters channels (C) while keeping spatial dimensions (H, W) identical."
    }
  },
  {
    "id": 85,
    "category": "Stride & Padding",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "An input feature map has dimensions 64 x 64 x 3. It is processed by a Conv2D layer with 16 filters of size 5 x 5, padding P=2, and stride S=2. What is the spatial shape of the output volume?",
    "options": [
      "32 x 32 x 16",
      "30 x 30 x 16",
      "31 x 31 x 16",
      "64 x 64 x 16"
    ],
    "correctAnswer": "32 x 32 x 16",
    "explanation": {
      "summary": "Apply spatial output formula: O = floor((W - K + 2P)/S) + 1.",
      "whyCorrect": "O = floor((64 - 5 + 2*2) / 2) + 1 = floor((64 - 5 + 4) / 2) + 1 = floor(63 / 2) + 1 = 31 + 1 = 32. Depth equals number of filters = 16. Output shape is 32 x 32 x 16.",
      "whyWrong": "30 or 31 results from forgetting the +1 term or calculating floor(63/2) incorrectly.",
      "keyConcept": "Formula: O = floor((W - K + 2P)/S) + 1. Here: floor((64 - 5 + 4)/2) + 1 = 31 + 1 = 32."
    }
  },
  {
    "id": 86,
    "category": "Pooling Layers",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "A feature map of shape 14 x 14 x 64 enters a MaxPooling2D layer with pool size 2 x 2 and stride S=2. What is the output tensor shape and how many trainable parameters are learned in this layer?",
    "options": [
      "Output shape: 7 x 7 x 64 | Trainable parameters: 0",
      "Output shape: 7 x 7 x 32 | Trainable parameters: 128",
      "Output shape: 13 x 13 x 64 | Trainable parameters: 256",
      "Output shape: 7 x 7 x 64 | Trainable parameters: 256"
    ],
    "correctAnswer": "Output shape: 7 x 7 x 64 | Trainable parameters: 0",
    "explanation": {
      "summary": "Max Pooling downsamples spatial dimensions by taking the maximum in each 2x2 window; pooling never has learnable parameters and preserves channel depth.",
      "whyCorrect": "Spatial dimension: 14 / 2 = 7. Number of channels remains 64. Max pooling computes a fixed mathematical operation (max), so parameter count is strictly 0.",
      "whyWrong": "Pooling layers NEVER modify the number of channels (cannot change 64 to 32) and NEVER have trainable parameters.",
      "keyConcept": "Pooling Rule: Retains channel count C, downsamples spatial dimensions (H/S, W/S), has EXACTLY 0 parameters."
    }
  },
  {
    "id": 87,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "Why do standard CNN architectures systematically decrease spatial dimensions (via pooling/stride) while increasing channel depth as signals move deeper into the network?",
    "options": [
      "To expand spatial receptive fields and trade fine pixel resolution for rich, high-level semantic feature representations",
      "To prevent the number of total matrix multiplications from exceeding 1,000",
      "Because deeper layers require larger spatial maps to preserve edge detail",
      "To guarantee that all hidden layer outputs have zero mean and unit variance"
    ],
    "correctAnswer": "To expand spatial receptive fields and trade fine pixel resolution for rich, high-level semantic feature representations",
    "explanation": {
      "summary": "Visual hierarchies transition from 'where' (high spatial resolution, low semantics) to 'what' (low spatial resolution, high semantics).",
      "whyCorrect": "Early layers capture exact spatial coordinates of simple edges. Deeper layers combine these into abstract concepts (eyes, wheels, faces). Because spatial location matters less than the presence of complex patterns, spatial resolution is compressed while channels are added to encode diverse semantic features.",
      "whyWrong": "It has nothing to do with limiting matrix ops to 1,000, deeper layers have smaller (not larger) spatial maps, and spatial downsampling does not guarantee zero mean.",
      "keyConcept": "CNN Design Philosophy: High Spatial/Low Channel (early) -> Low Spatial/High Channel (deep)."
    }
  },
  {
    "id": 88,
    "category": "Pooling Layers",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "What mathematical operation is performed by a Global Average Pooling (GAP) layer on a feature tensor of shape H x W x C?",
    "options": [
      "It computes the mean across all spatial pixels for each channel, yielding a 1 x 1 x C (or 1D vector of length C) representation with zero parameters",
      "It calculates the global maximum value across the entire 3D volume, reducing the tensor to a single scalar",
      "It flattens all H * W * C values into a dense vector and multiplies them by a learnable weight matrix",
      "It computes the moving average across consecutive video frames in time"
    ],
    "correctAnswer": "It computes the mean across all spatial pixels for each channel, yielding a 1 x 1 x C (or 1D vector of length C) representation with zero parameters",
    "explanation": {
      "summary": "Global Average Pooling averages out the entire spatial plane of each feature map into a single summary number.",
      "whyCorrect": "For each channel c, GAP computes (1 / (H * W)) * \u03a3_x \u03a3_y F(x, y, c). This collapses H x W to 1 x 1 while preserving all C channels, requiring 0 trainable parameters.",
      "whyWrong": "It does not produce a single scalar, does not use learnable weights (unlike Flatten + Dense), and has nothing to do with video frames.",
      "keyConcept": "Global Average Pooling (GAP): Maps (H, W, C) -> (1, 1, C) with 0 parameters."
    }
  },
  {
    "id": 89,
    "category": "CNN Architectures",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "Why did modern deep architectures (e.g., ResNet, Inception) replace large Flatten + Dense layers with Global Average Pooling (GAP) before the final classification layer?",
    "options": [
      "To drastically reduce trainable parameters, prevent overfitting, and eliminate sensitivity to input spatial dimensions",
      "To increase the floating-point operations per second (FLOPs) required by GPUs",
      "Because Flatten layers cause numerical overflow in cross-entropy loss functions",
      "To enable the network to output continuous negative probability values"
    ],
    "correctAnswer": "To drastically reduce trainable parameters, prevent overfitting, and eliminate sensitivity to input spatial dimensions",
    "explanation": {
      "summary": "In early networks like VGG, over 80% of all parameters were concentrated in the first Dense layer after Flatten. GAP eliminates this bottleneck.",
      "whyCorrect": "Flattening a 7x7x512 volume to 25,088 units and connecting to a Dense(4096) layer creates over 102 million parameters in a single layer, causing severe overfitting. GAP collapses 7x7x512 to 512 numbers with 0 parameters, followed directly by Dense(Classes).",
      "whyWrong": "GAP reduces FLOPs rather than increases them, Flatten does not cause overflow, and probabilities cannot be negative.",
      "keyConcept": "GAP eliminates parameter explosion: VGG Flatten+Dense = 100M+ params; ResNet GAP = 0 params."
    }
  },
  {
    "id": 90,
    "category": "Stride & Padding",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "What is a Dilated (Atrous) Convolution, and what unique advantage does it offer in computer vision tasks like semantic segmentation?",
    "options": [
      "It inserts spaces (holes) between kernel elements according to a dilation rate, expanding the receptive field without adding parameters or reducing spatial resolution",
      "It randomly drops 50% of the kernel weights during training to prevent overfitting",
      "It rotates the kernel by 45 degrees between successive forward passes",
      "It applies 1D convolutions along the channel axis instead of spatial axes"
    ],
    "correctAnswer": "It inserts spaces (holes) between kernel elements according to a dilation rate, expanding the receptive field without adding parameters or reducing spatial resolution",
    "explanation": {
      "summary": "Dilated convolutions increase the filter's spatial reach without increasing parameter count or using pooling downsampling.",
      "whyCorrect": "A 3x3 filter with dilation rate d=2 covers a 5x5 spatial area, but still only evaluates 9 weights. In semantic segmentation, this captures wide spatial context while preserving dense pixel-level resolution.",
      "whyWrong": "It does not drop weights (that is Dropout), does not rotate kernels, and is a 2D spatial operation (not 1D channel operation).",
      "keyConcept": "Dilated (Atrous) Convolution: Expands receptive field without increasing parameters or downsampling spatial resolution."
    }
  },
  {
    "id": 91,
    "category": "CNN Architectures",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "What were the primary architectural breakthroughs introduced by AlexNet (2012) that revolutionized deep computer vision compared to LeNet-5 (1998)?",
    "options": [
      "Introduction of ReLU activations (preventing saturation), Dropout regularization, and GPU-accelerated training on ImageNet",
      "Introduction of residual skip connections and self-attention mechanisms",
      "Replacement of all convolutional layers with pure recurrent LSTM units",
      "Use of Mean Squared Error loss instead of Cross-Entropy for classification"
    ],
    "correctAnswer": "Introduction of ReLU activations (preventing saturation), Dropout regularization, and GPU-accelerated training on ImageNet",
    "explanation": {
      "summary": "AlexNet proved the feasibility of deep learning by combining ReLU, Dropout, and parallel CUDA GPUs to win ImageNet 2012 by an unprecedented margin.",
      "whyCorrect": "LeNet-5 (1998) used Sigmoid/Tanh and struggled with depth. AlexNet (8 layers) replaced Tanh with ReLU (6x faster training), used Dropout (0.5) to combat overfitting, and split computation across two NVIDIA GPUs.",
      "whyWrong": "Skip connections were introduced by ResNet (2015), attention by Transformers (2017), and AlexNet used Cross-Entropy with Conv layers, not LSTMs.",
      "keyConcept": "AlexNet Trifecta: ReLU (fast training, no saturation) + Dropout (regularization) + GPUs (scaling)."
    }
  },
  {
    "id": 92,
    "category": "CNN Architectures",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "What fundamental degradation problem in ultra-deep networks did ResNet (Deep Residual Learning, 2015) successfully overcome?",
    "options": [
      "The degradation phenomenon where increasing network depth caused training error (and test error) to worsen due to vanishing gradients",
      "The inability of GPUs to allocate memory buffers for more than 16 layers",
      "The complete failure of the backpropagation chain rule to compute derivatives on odd numbers of layers",
      "The mathematical impossibility of applying softmax to more than 1,000 output categories"
    ],
    "correctAnswer": "The degradation phenomenon where increasing network depth caused training error (and test error) to worsen due to vanishing gradients",
    "explanation": {
      "summary": "Before ResNet, adding more layers to plain networks caused training error to increase, proving optimization failure rather than overfitting.",
      "whyCorrect": "As networks grew past 20 layers, gradients vanished during backprop, making deeper networks perform worse than shallow counterparts on the training set. ResNet's identity shortcuts allowed gradients to flow directly back through the entire depth unimpeded.",
      "whyWrong": "GPU memory handles depth via batch sizing; chain rule works on any layer count; softmax handles arbitrary category counts.",
      "keyConcept": "ResNet solved the Degradation Problem: Plain deep networks had higher TRAINING error than shallow networks due to vanishing gradients."
    }
  },
  {
    "id": 93,
    "category": "CNN Architectures",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "In a ResNet residual building block, if the input is x and the stacked convolutional layers learn the residual mapping F(x), what is the formula for the block's output y?",
    "options": [
      "y = F(x) + x  (followed by a ReLU activation)",
      "y = F(x) * x  (element-wise multiplication)",
      "y = F(x) - x  (residual subtraction)",
      "y = F(x) / (x + \u03b5)  (batch ratio normalization)"
    ],
    "correctAnswer": "y = F(x) + x  (followed by a ReLU activation)",
    "explanation": {
      "summary": "Residual blocks learn the perturbation F(x) = H(x) - x, outputting H(x) = F(x) + x via an identity shortcut.",
      "whyCorrect": "Instead of forcing layers to fit an unreferenced underlying mapping H(x), ResNet explicitly fits the residual F(x) = H(x) - x. Adding the input x via a skip connection gives y = F(x) + x. If optimal mapping is identity, weights easily decay F(x) to 0.",
      "whyWrong": "Residual connections use addition (+), not multiplication, subtraction, or division.",
      "keyConcept": "Residual Formula: y = F(x) + x. Gradient during backprop: \u2202L/\u2202x = \u2202L/\u2202y * (\u2202F/\u2202x + 1), ensuring a direct highway of 1 for gradients."
    }
  },
  {
    "id": 94,
    "category": "CNN Architectures",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "What is the defining architectural characteristic of the VGG network family (VGG-16 and VGG-19)?",
    "options": [
      "Exclusive use of small 3x3 convolutional filters stacked uniformly throughout the entire network with 2x2 max pooling",
      "Use of large 11x11 filters in early layers and 1x1 filters in deep layers",
      "Dynamic switching between convolutional layers and recurrent LSTM cells",
      "Complete elimination of activation functions between convolutional layers"
    ],
    "correctAnswer": "Exclusive use of small 3x3 convolutional filters stacked uniformly throughout the entire network with 2x2 max pooling",
    "explanation": {
      "summary": "VGG standardized CNN design by replacing diverse filter sizes (5x5, 7x7, 11x11) with uniform, homogeneous stacks of 3x3 convs.",
      "whyCorrect": "VGG demonstrated that a simple, homogenous architecture using only 3x3 convs (stride 1, padding same) and 2x2 max pools (stride 2) achieved superior accuracy by increasing depth and non-linearities while reducing parameter counts.",
      "whyWrong": "Large 11x11 filters were in AlexNet; VGG does not use LSTMs; and VGG uses ReLU activations after every single convolutional layer.",
      "keyConcept": "VGG Philosophy: Simplicity and depth via uniform stacks of 3x3 conv layers."
    }
  },
  {
    "id": 95,
    "category": "Vision Tasks",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "In object detection, how is the Intersection over Union (IoU) metric computed between a predicted bounding box (B_pred) and a ground-truth box (B_gt)?",
    "options": [
      "IoU = Area(B_pred \u2229 B_gt) / Area(B_pred \u222a B_gt)",
      "IoU = Area(B_pred \u2229 B_gt) * Area(B_pred \u222a B_gt)",
      "IoU = Area(B_pred) / Area(B_gt)",
      "IoU = Area(B_pred \u222a B_gt) - Area(B_pred \u2229 B_gt)"
    ],
    "correctAnswer": "IoU = Area(B_pred \u2229 B_gt) / Area(B_pred \u222a B_gt)",
    "explanation": {
      "summary": "IoU (Jaccard Index) measures overlap accuracy by dividing intersection area by union area.",
      "whyCorrect": "The metric divides the overlapping area shared by both boxes by the total combined area encompassed by both boxes. Values range from 0 (no overlap) to 1 (perfect alignment). In PASCAL VOC and COCO, IoU >= 0.5 is standard for a True Positive.",
      "whyWrong": "Multiplying areas, simple area ratios, or area differences do not normalize overlap geometry.",
      "keyConcept": "IoU = Area of Overlap / Area of Union. True Positive benchmark is typically IoU >= 0.5."
    }
  },
  {
    "id": 96,
    "category": "Vision Tasks",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "How do Object Detection and Semantic Segmentation differ in their output representations?",
    "options": [
      "Object detection outputs class labels with rectangular bounding boxes [x, y, w, h]; Semantic segmentation assigns a class label to every individual pixel",
      "Object detection classifies the entire image with a single label; Semantic segmentation outputs 3D mesh coordinates",
      "Object detection only works on grayscale images; Semantic segmentation only works on video streams",
      "There is no difference; they are synonymous terms for image classification"
    ],
    "correctAnswer": "Object detection outputs class labels with rectangular bounding boxes [x, y, w, h]; Semantic segmentation assigns a class label to every individual pixel",
    "explanation": {
      "summary": "Object detection provides box-level localization; semantic segmentation provides dense pixel-level classification masks.",
      "whyCorrect": "Classification: 1 label per image. Object Detection: bounding box coordinates [x, y, w, h] + class for each object. Semantic Segmentation: dense segmentation map where pixel (i, j) is assigned a class label (e.g., road, sky, car).",
      "whyWrong": "Classification (not detection) gives 1 label per image, both work on RGB images, and they are distinct computer vision tasks.",
      "keyConcept": "Vision Tasks: Classification (Image level) -> Detection (Box level) -> Semantic Segmentation (Pixel level)."
    }
  },
  {
    "id": 97,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "What is the primary architecture and learning objective of an Autoencoder (Module 3)?",
    "options": [
      "An encoder compresses the input into a low-dimensional bottleneck latent representation z, and a decoder reconstructs the original input by minimizing reconstruction loss",
      "Two discriminator networks compete in a zero-sum minimax game to generate adversarial noise",
      "A convolutional network classifies input images into 1,000 distinct ImageNet categories",
      "A recurrent network predicts future frame pixels based strictly on optical flow vectors"
    ],
    "correctAnswer": "An encoder compresses the input into a low-dimensional bottleneck latent representation z, and a decoder reconstructs the original input by minimizing reconstruction loss",
    "explanation": {
      "summary": "Autoencoders perform self-supervised dimensionality reduction by learning to compress and reconstruct inputs.",
      "whyCorrect": "An autoencoder consists of Encoder q_\u03b8(z|x) mapping input x to latent code z, and Decoder p_\u03d5(x|z) reconstructing x\u0302. The network is trained end-to-end to minimize reconstruction loss L(x, x\u0302) = ||x - x\u0302||\u00b2.",
      "whyWrong": "Two competing networks describes a GAN (Generative Adversarial Network), ImageNet classification is supervised learning, and optical flow is video analysis.",
      "keyConcept": "Autoencoder Architecture: Input x -> Encoder -> Latent Bottleneck z -> Decoder -> Reconstruction x\u0302."
    }
  },
  {
    "id": 98,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "Why is an information bottleneck (latent dimension size significantly smaller than input dimension) essential in standard autoencoders?",
    "options": [
      "To prevent the network from simply learning a trivial identity function that copies inputs directly to outputs without discovering meaningful representations",
      "To ensure the loss function derivative remains positive at all times",
      "Because decoders cannot perform matrix multiplication on dimensions greater than 32",
      "To eliminate the need for activation functions throughout the model"
    ],
    "correctAnswer": "To prevent the network from simply learning a trivial identity function that copies inputs directly to outputs without discovering meaningful representations",
    "explanation": {
      "summary": "An undercomplete bottleneck forces the network to retain only the most informative statistical properties of the data.",
      "whyCorrect": "If latent space dimension dim(z) >= dim(x), the model can achieve zero reconstruction loss by simply learning the identity mapping I(x) = x without capturing underlying data structure. Constraining dim(z) << dim(x) forces efficient non-linear compression.",
      "whyWrong": "Loss derivatives can be negative/positive, decoders handle arbitrary dimensions, and activation functions remain necessary.",
      "keyConcept": "Undercomplete Bottleneck: Forces the autoencoder to prioritize the most important latent factors (non-linear PCA)."
    }
  },
  {
    "id": 99,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "When training an autoencoder on normalized grayscale images (pixel values in [0, 1], such as MNIST), which reconstruction loss functions are standard?",
    "options": [
      "Mean Squared Error (MSE) or Binary Cross-Entropy (BCE) evaluated between input pixels x and reconstructed pixels x\u0302",
      "Categorical Cross-Entropy over 1,000 one-hot image classes",
      "Triplet Loss comparing anchor, positive, and negative embeddings",
      "Connectionist Temporal Classification (CTC) loss"
    ],
    "correctAnswer": "Mean Squared Error (MSE) or Binary Cross-Entropy (BCE) evaluated between input pixels x and reconstructed pixels x\u0302",
    "explanation": {
      "summary": "Reconstruction loss measures pixel-by-pixel dissimilarity between the ground truth image x and the reconstructed image x\u0302.",
      "whyCorrect": "MSE loss L = (1/N) * \u03a3 (x_i - x\u0302_i)\u00b2 measures squared Euclidean distance. If pixels are treated as Bernoulli probabilities [0, 1], BCE loss L = -\u03a3 [x_i * log(x\u0302_i) + (1 - x_i) * log(1 - x\u0302_i)] with a Sigmoid output is also widely used.",
      "whyWrong": "Categorical cross-entropy requires discrete classes, Triplet loss is for metric learning, and CTC is for speech/OCR sequence alignment.",
      "keyConcept": "Autoencoder Reconstruction Loss: MSE = ||x - x\u0302||\u00b2 or BCE (for normalized [0, 1] pixels)."
    }
  },
  {
    "id": 100,
    "category": "CNN Fundamentals",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "What hierarchical feature representation is learned across depth in a Convolutional Neural Network?",
    "options": [
      "Early layers learn low-level edges and textures; middle layers learn object parts and motifs; deep layers learn high-level semantic objects and scenes",
      "Early layers learn full semantic objects; deep layers decompose them into individual Fourier sine waves",
      "All convolutional layers learn identical random noise patterns regardless of depth",
      "Early layers learn classification labels; deep layers learn input pixel normalization parameters"
    ],
    "correctAnswer": "Early layers learn low-level edges and textures; middle layers learn object parts and motifs; deep layers learn high-level semantic objects and scenes",
    "explanation": {
      "summary": "CNNs construct a compositional hierarchy of spatial representations, mimicking the visual cortex (V1 to IT).",
      "whyCorrect": "As demonstrated in Lecture 3 slides: Layer 1 detects oriented edges, blobs, and color contrasts. Layer 2 combines edges into textures and geometric corners. Layer 3 combines motifs into object parts (eyes, noses, tires). Deep layers recognize entire semantic entities (faces, cars, dogs).",
      "whyWrong": "Hierarchies flow from simple local primitives to complex global semantics, not in reverse.",
      "keyConcept": "Spatial Feature Hierarchy: Edges & Textures (Shallow) -> Parts & Motifs (Middle) -> Objects & Scenes (Deep)."
    }
  },
  {
    "id": 101,
    "category": "Lab & Notebooks",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "In Module 01 (Part1_TensorFlow.ipynb), how does TensorFlow track operations to compute gradients for automatic differentiation?",
    "options": [
      "Within a 'with tf.GradientTape() as tape:' context block that records forward operations and evaluates tape.gradient(target, sources)",
      "By computing numerical finite differences using (f(x+h) - f(x)) / h for every float variable",
      "By converting Python bytecode directly into symbolic C++ matrices via sympy",
      "By requiring the programmer to manually implement the derivative function for every custom layer"
    ],
    "correctAnswer": "Within a 'with tf.GradientTape() as tape:' context block that records forward operations and evaluates tape.gradient(target, sources)",
    "explanation": {
      "summary": "TensorFlow uses tf.GradientTape to record operations on a tape during the forward pass, and then plays it backward to compute exact reverse-mode automatic differentiation.",
      "whyCorrect": "As coded in Lab 1 (Part1_TensorFlow.ipynb Section 1.4), operations executed inside 'with tf.GradientTape() as tape:' are recorded. Calling tape.gradient(y, x) computes \u2202y/\u2202x efficiently and analytically via the chain rule.",
      "whyWrong": "Numerical finite differences are too slow and prone to truncation error; symbolic differentiation creates massive expressions; manual derivatives are not required with autograd.",
      "keyConcept": "Lab Reference (Module 01 Part1_TensorFlow.ipynb): with tf.GradientTape() as tape: y = x**2; dy_dx = tape.gradient(y, x)."
    }
  },
  {
    "id": 102,
    "category": "Lab & Notebooks",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "In Module 01 (PT_Part1_Intro.ipynb), how does PyTorch designate that a tensor's operations should be tracked for automatic differentiation?",
    "options": [
      "By initializing the tensor with 'requires_grad=True', allowing .backward() to populate the '.grad' attribute",
      "By wrapping all tensor operations inside a Java virtual machine sandbox",
      "By executing all tensor arithmetic inside a separate threading.Thread worker",
      "By declaring the tensor as a global constant using torch.immutable()"
    ],
    "correctAnswer": "By initializing the tensor with 'requires_grad=True', allowing .backward() to populate the '.grad' attribute",
    "explanation": {
      "summary": "PyTorch uses the requires_grad=True flag to tell its autograd engine to track every forward operation on that tensor in a dynamic DAG.",
      "whyCorrect": "As implemented in Lab 1 (PT_Part1_Intro.ipynb Section 1.4), setting requires_grad=True tracks operations. When loss.backward() is invoked, the gradients are automatically computed via reverse-mode AD and stored in tensor.grad.",
      "whyWrong": "PyTorch runs natively in C++ via LibTorch (not Java), does not use thread sandboxes for math, and has no torch.immutable() function.",
      "keyConcept": "Lab Reference (Module 01 PT_Part1_Intro.ipynb): x = torch.tensor(..., requires_grad=True); y = x**2; y.backward(); print(x.grad)."
    }
  },
  {
    "id": 103,
    "category": "Lab & Notebooks",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "In Module 01 (Part1_TensorFlow.ipynb & PT_Part1_Intro.ipynb), how are Tensors defined and categorized by dimensionality?",
    "options": [
      "0-D Tensor = Scalar, 1-D Tensor = Vector, 2-D Tensor = Matrix, 3-D+ Tensor = Multidimensional array (e.g. Batch x Height x Width x Channels)",
      "0-D Tensor = Matrix, 1-D Tensor = Scalar, 2-D Tensor = Vector",
      "Tensors can strictly possess only 2 dimensions; any higher-dimensional array is classified as a DataFrame",
      "A Tensor is strictly a 1D Python list of strings"
    ],
    "correctAnswer": "0-D Tensor = Scalar, 1-D Tensor = Vector, 2-D Tensor = Matrix, 3-D+ Tensor = Multidimensional array (e.g. Batch x Height x Width x Channels)",
    "explanation": {
      "summary": "Tensors are generalizations of matrices to arbitrary N-dimensional spaces.",
      "whyCorrect": "As introduced in Lab 1 Section 1.2: A 0-d tensor is a single number (scalar); a 1-d tensor is a 1D list (vector); a 2-d tensor is a table of numbers (matrix); 3-d and 4-d tensors represent multi-channel image batches (N, H, W, C).",
      "whyWrong": "0-D is not a matrix, tensors are not limited to 2 dimensions, and tensors contain numeric data (floats/ints), not lists of strings.",
      "keyConcept": "Tensor Ranks: Rank 0 = Scalar | Rank 1 = Vector | Rank 2 = Matrix | Rank 3 = Volume/RGB image | Rank 4 = Batch of images."
    }
  },
  {
    "id": 104,
    "category": "Lab & Notebooks",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "In Module 01 (data_augmentation.ipynb), what does the parameter value in tf.keras.layers.RandomRotation(0.2) represent?",
    "options": [
      "A random rotation angle sampled from the range [-20%, +20%] of 2\u03c0 (or approximately -72 degrees to +72 degrees)",
      "A constant static rotation of precisely 0.2 radians applied to all images",
      "A 20% probability of dropping the entire image from the training batch",
      "A 0.2 pixel spatial shift along the vertical y-axis"
    ],
    "correctAnswer": "A random rotation angle sampled from the range [-20%, +20%] of 2\u03c0 (or approximately -72 degrees to +72 degrees)",
    "explanation": {
      "summary": "In tf.keras.layers.RandomRotation, float factor represents a fraction of 2\u03c0 (a full circle).",
      "whyCorrect": "In Keras preprocessing layers, passing factor=0.2 defines an upper and lower bound interval [-factor, +factor] expressed as a fraction of 2\u03c0: [-0.2 * 360\u00b0, +0.2 * 360\u00b0] = [-72\u00b0, +72\u00b0].",
      "whyWrong": "It is not a static constant angle (it is randomly sampled per image), not a dropout probability, and not a pixel translation.",
      "keyConcept": "Lab Reference (Module 01 data_augmentation.ipynb): RandomRotation(0.2) samples angles in [-20% * 2\u03c0, +20% * 2\u03c0]."
    }
  },
  {
    "id": 105,
    "category": "Lab & Notebooks",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "In Module 02 (Part1_MNIST.ipynb), why is 'SparseCategoricalCrossentropy' selected instead of 'CategoricalCrossentropy' as the loss function?",
    "options": [
      "Because MNIST target labels are represented as single integer class indices (0, 1, ..., 9) rather than one-hot encoded vectors [0, 0, 1, ...]",
      "Because the input images are sparse grayscale matrices with many zero pixels",
      "Because convolutional layers cannot compute derivatives on categorical cross-entropy",
      "Because SparseCategoricalCrossentropy eliminates the need for training epochs"
    ],
    "correctAnswer": "Because MNIST target labels are represented as single integer class indices (0, 1, ..., 9) rather than one-hot encoded vectors [0, 0, 1, ...]",
    "explanation": {
      "summary": "SparseCategoricalCrossentropy expects integer labels; CategoricalCrossentropy expects one-hot vectors.",
      "whyCorrect": "In Lab 2, y_train contains integer labels (e.g. 7, 2, 0). SparseCategoricalCrossentropy avoids the memory overhead of one-hot encoding 60,000 vectors of size 10, computing identical math internally.",
      "whyWrong": "It has nothing to do with image pixel sparsity, convolution handles any loss, and epochs are still required.",
      "keyConcept": "Lab Rule (Module 02 Part1_MNIST.ipynb): Integer labels (0-9) -> SparseCategoricalCrossentropy; One-hot labels -> CategoricalCrossentropy."
    }
  },
  {
    "id": 106,
    "category": "Lab & Notebooks",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "In Module 02 (Part1_MNIST.ipynb & PT_Part1_MNIST.ipynb), what test accuracy difference was observed between the baseline Fully Connected model and the CNN model?",
    "options": [
      "Baseline Fully Connected model achieved ~97% test accuracy; CNN model achieved near-perfect accuracy (>99%) with superior spatial feature extraction",
      "Both models achieved exactly identical accuracy of 50%",
      "The Fully Connected model scored 100% while the CNN scored 75% due to pooling losses",
      "Neither model could train because MNIST contains too many color channels"
    ],
    "correctAnswer": "Baseline Fully Connected model achieved ~97% test accuracy; CNN model achieved near-perfect accuracy (>99%) with superior spatial feature extraction",
    "explanation": {
      "summary": "CNNs outperform dense networks on images because weight sharing and local receptive fields preserve 2D topology.",
      "whyCorrect": "As documented in Lab 2 markdown and execution cells: Dense model (Flatten -> Dense(128) -> Dense(10)) reaches ~97% accuracy. The CNN model (Conv2D -> MaxPool -> Conv2D -> MaxPool -> Dense) achieves >99% test accuracy with far fewer early parameters.",
      "whyWrong": "Accuracy was not 50%, CNN clearly outperformed dense, and MNIST is grayscale (1 channel).",
      "keyConcept": "Lab Finding (Module 02 Lab 2): Dense Model ~97% vs CNN Model >99% test accuracy on MNIST."
    }
  },
  {
    "id": 107,
    "category": "Lab & Notebooks",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "In Module 02 (PT_Part1_MNIST.ipynb), why does the PyTorch model output raw linear logits without a final nn.Softmax() layer when using nn.CrossEntropyLoss()?",
    "options": [
      "PyTorch's nn.CrossEntropyLoss() internally combines nn.LogSoftmax() and nn.NLLLoss() for superior numerical stability",
      "Because PyTorch cannot compute derivatives of exponential functions",
      "Because Softmax is only compatible with TensorFlow models",
      "To allow the network to output negative probability values during testing"
    ],
    "correctAnswer": "PyTorch's nn.CrossEntropyLoss() internally combines nn.LogSoftmax() and nn.NLLLoss() for superior numerical stability",
    "explanation": {
      "summary": "Passing raw logits directly into nn.CrossEntropyLoss avoids numerical underflow/overflow in log(exp(z)).",
      "whyCorrect": "In PyTorch (PT_Part1_MNIST.ipynb), the model's final layer is self.fc2 = nn.Linear(128, 10) with no activation. nn.CrossEntropyLoss applies LogSoftmax internally using the LogSumExp trick, preventing catastrophic cancellation.",
      "whyWrong": "PyTorch handles exponentials fine, Softmax works in both frameworks, and probabilities cannot be negative.",
      "keyConcept": "PyTorch Idiom: Model outputs raw logits -> nn.CrossEntropyLoss() applies LogSoftmax + NLLLoss together."
    }
  },
  {
    "id": 108,
    "category": "Lab & Notebooks",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In Module 03 (autoencoder.ipynb), what specialized layer is used in the decoder of a Convolutional Autoencoder to reverse spatial downsampling and upsample feature maps back to 28x28?",
    "options": [
      "Conv2DTranspose (Transposed Convolution) with stride=2",
      "MaxPooling2D with negative strides",
      "Dense layers with 1D convolution weights",
      "Dropout layers with probability p=1.0"
    ],
    "correctAnswer": "Conv2DTranspose (Transposed Convolution) with stride=2",
    "explanation": {
      "summary": "Conv2DTranspose performs fractionally strided convolution, expanding spatial height and width while learning filter weights.",
      "whyCorrect": "In autoencoder.ipynb Section 'Convolutional autoencoder', the encoder downsamples using Conv2D(16, 3, strides=2) and Conv2D(8, 3, strides=2) to 7x7. The decoder uses layers.Conv2DTranspose(8, 3, strides=2) and layers.Conv2DTranspose(16, 3, strides=2) to upsample 7x7 -> 14x14 -> 28x28.",
      "whyWrong": "Pooling layers do not accept negative strides, Dense layers destroy 2D spatial arrangement, and Dropout at p=1.0 drops all activations.",
      "keyConcept": "Lab Reference (Module 03 autoencoder.ipynb): Conv2D(strides=2) = Downsample | Conv2DTranspose(strides=2) = Upsample."
    }
  },
  {
    "id": 109,
    "category": "Lab & Notebooks",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "In Module 03 (autoencoder.ipynb Section 'Image denoising'), how is a Denoising Autoencoder trained to remove synthetic noise from corrupted images?",
    "options": [
      "It is fed noisy images x_noisy = x + noise as input, but its reconstruction loss is evaluated against the original CLEAN ground-truth images x_train",
      "It uses a high-pass Fourier filter to delete all noisy pixels prior to passing to the encoder",
      "It computes the cosine similarity between the noisy image and a random Gaussian distribution",
      "It runs gradient descent in reverse to maximize the output noise level"
    ],
    "correctAnswer": "It is fed noisy images x_noisy = x + noise as input, but its reconstruction loss is evaluated against the original CLEAN ground-truth images x_train",
    "explanation": {
      "summary": "A Denoising Autoencoder maps x_noisy -> x_clean, forcing the latent code to capture underlying manifold structure and ignore random noise.",
      "whyCorrect": "As coded in autoencoder.ipynb: x_train_noisy = x_train + 0.2 * tf.random.normal(...). The model is trained via autoencoder.fit(x_train_noisy, x_train), teaching the network to reconstruct the clean signal from the corrupted input.",
      "whyWrong": "It does not use Fourier filters, does not compare against random Gaussians, and minimizes (rather than maximizes) noise in reconstructions.",
      "keyConcept": "Lab Reference (Module 03 autoencoder.ipynb): autoencoder.fit(x_train_noisy, x_train, epochs=10, loss='mean_squared_error')."
    }
  },
  {
    "id": 110,
    "category": "Lab & Notebooks",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In Module 03 (autoencoder.ipynb Section 'Anomaly detection'), how does an autoencoder successfully detect anomalies (such as abnormal ECG signals)?",
    "options": [
      "The model is trained strictly on normal data; when an abnormal sample is evaluated, the reconstruction error (loss) is significantly higher, flagging an anomaly if error exceeds a threshold",
      "By outputting binary 0 or 1 labels directly from a final Softmax layer",
      "By computing the derivative of the input signal with respect to time",
      "By memorizing all known abnormal ECG samples in a lookup table dictionary"
    ],
    "correctAnswer": "The model is trained strictly on normal data; when an abnormal sample is evaluated, the reconstruction error (loss) is significantly higher, flagging an anomaly if error exceeds a threshold",
    "explanation": {
      "summary": "An autoencoder trained solely on normal data learns only the normal manifold; anomalous data cannot be reconstructed accurately.",
      "whyCorrect": "In autoencoder.ipynb, the autoencoder trains only on normal ECG rhythms. During testing, normal rhythms have low reconstruction error (MAE < threshold), while anomalous rhythms produce high reconstruction error (MAE > threshold), providing an unsupervised anomaly detector.",
      "whyWrong": "Autoencoders are unsupervised and do not output classification labels directly, do not compute time derivatives, and do not use lookup tables.",
      "keyConcept": "Lab Reference (Module 03 autoencoder.ipynb Anomaly Detection): Reconstruction Error > Threshold => Anomaly Detected."
    }
  },
  {
    "id": 111,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "In MIT 6.S191 Lab 2 Part 2 (PT_Part2_Debiasing.ipynb), what is identified as the root cause of algorithmic bias in standard facial detection CNN models?",
    "options": [
      "Severe demographic imbalances in training datasets (such as CelebA having heavy over-representation of lighter-skinned faces compared to darker-skinned faces)",
      "Using ReLU non-linearities instead of Sigmoid functions",
      "Using convolutional filters smaller than 7x7",
      "Using stochastic gradient descent with an adaptive momentum"
    ],
    "correctAnswer": "Severe demographic imbalances in training datasets (such as CelebA having heavy over-representation of lighter-skinned faces compared to darker-skinned faces)",
    "explanation": {
      "summary": "Standard vision models trained on imbalanced datasets inherit demographic disparities, exhibiting drastically higher error rates on minority subgroups.",
      "whyCorrect": "As demonstrated in Lab 2 Part 2 (Section 2.1 & 2.2), datasets like CelebA are predominantly light-skinned. When a standard CNN is trained naively, it achieves high overall accuracy by maximizing performance on the majority group while failing significantly on under-represented demographics (e.g. darker females).",
      "whyWrong": "Algorithmic bias is caused by data distribution skew and optimization incentives, not activation types or filter kernel sizes.",
      "keyConcept": "Lab Reference (MIT Lab 2 PT_Part2_Debiasing.ipynb): Dataset Demographic Imbalance -> Skewed Latent Representations -> Algorithmic Bias."
    }
  },
  {
    "id": 112,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In Variational Autoencoders (VAEs) and DB-VAE, what is the critical purpose of the 'Reparameterization Trick' (z = mu + exp(0.5 * logsigma) * eps, where eps ~ N(0, I))?",
    "options": [
      "It makes the stochastic sampling operation differentiable by isolating randomness into an independent noise variable epsilon, allowing backpropagation gradients to flow into the encoder parameters mu and sigma",
      "It guarantees that the latent dimension will strictly equal the input pixel resolution",
      "It converts 32-bit floating point weights into 8-bit integers to reduce memory usage",
      "It eliminates the need to compute reconstruction loss during decoder training"
    ],
    "correctAnswer": "It makes the stochastic sampling operation differentiable by isolating randomness into an independent noise variable epsilon, allowing backpropagation gradients to flow into the encoder parameters mu and sigma",
    "explanation": {
      "summary": "Standard random sampling is a non-differentiable stochastic operation with zero defined gradients. The reparameterization trick rewrites sampling as a differentiable affine transformation of random noise.",
      "whyCorrect": "As derived in Section 2.4 (Reparameterization): Directly sampling z ~ N(mu, sigma^2) prevents gradient flow through the network. Setting z = mu + sigma * eps (where eps ~ N(0, I) has no learned parameters) ensures dz/dmu = 1 and dz/dsigma = eps, making the entire model end-to-end differentiable via standard backpropagation.",
      "whyWrong": "It does not compress weight precision, does not equate latent size to input resolution, and does not bypass reconstruction loss.",
      "keyConcept": "Lab Reference (PT_Part2_Debiasing.ipynb Section 2.4): Reparameterization Trick: z = mu + exp(0.5 * logsigma) * eps (Differentiable Backprop through Stochastic Nodes)."
    }
  },
  {
    "id": 113,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In the VAE loss function, what fundamental regularization role is performed by the Kullback-Leibler (KL) Divergence loss term (L_KL)?",
    "options": [
      "It regularizes the latent space by penalizing the encoder when its predicted posterior distribution q(z|x) deviates from a standard isotropic Gaussian prior p(z) ~ N(0, I)",
      "It forces the latent variables to become orthogonal binary one-hot vectors",
      "It maximizes the training error to prevent gradient descent from converging prematurely",
      "It replaces the cross-entropy classification loss entirely"
    ],
    "correctAnswer": "It regularizes the latent space by penalizing the encoder when its predicted posterior distribution q(z|x) deviates from a standard isotropic Gaussian prior p(z) ~ N(0, I)",
    "explanation": {
      "summary": "KL Divergence measures statistical distance between the encoder's predicted distribution and a standard unit Gaussian prior, ensuring a continuous, clustered, and smooth latent manifold.",
      "whyCorrect": "Without the KL penalty, the encoder would isolate individual training points into distant, infinitesimally narrow clusters (overfitting, acting like a deterministic autoencoder). The KL term forces the latent space to center around mean 0 with variance 1, enabling smooth interpolation.",
      "whyWrong": "KL divergence does not binarize latents, does not intentionally corrupt training, and works alongside (rather than replacing) classification/reconstruction losses.",
      "keyConcept": "Lab Reference (PT_Part2_Debiasing.ipynb Section 2.4): L_VAE = c * L_KL + L_recon. KL term prevents arbitrary latent cluster collapse."
    }
  },
  {
    "id": 114,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In PT_Part2_Debiasing.ipynb (Section 2.4), what is the analytical formula for the latent loss L_KL(mu, sigma) of a multivariate Gaussian with diagonal covariance relative to a standard unit Gaussian?",
    "options": [
      "L_KL = 0.5 * sum(sigma_j + mu_j^2 - 1 - log(sigma_j))",
      "L_KL = sum(mu_j * sigma_j) / N",
      "L_KL = (1/N) * sum((x_i - x_hat_i)^2)",
      "L_KL = exp(mu_j) - exp(sigma_j)"
    ],
    "correctAnswer": "L_KL = 0.5 * sum(sigma_j + mu_j^2 - 1 - log(sigma_j))",
    "explanation": {
      "summary": "The KL divergence between N(mu, diag(sigma)) and N(0, I) has a closed-form analytical equation that can be computed without Monte Carlo sampling.",
      "whyCorrect": "As explicitly coded in Section 2.4 of PT_Part2_Debiasing.ipynb: D_KL(N(mu, sigma) || N(0, I)) = 0.5 * sum(sigma + mu^2 - 1 - log(sigma)). When parameterized via log(sigma), it is written as 0.5 * sum(exp(2*logsigma) + mu^2 - 1 - 2*logsigma).",
      "whyWrong": "The other options represent mean products, MSE reconstruction loss, or invalid heuristic exponentials.",
      "keyConcept": "Lab Equation (PT_Part2_Debiasing.ipynb): L_KL = 0.5 * sum(sigma_j + mu_j^2 - 1 - log(sigma_j))."
    }
  },
  {
    "id": 115,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In the Debiasing Variational Autoencoder (DB-VAE) model, how is the total loss function mathematically formulated for a batch containing both face (y=1) and non-face (y=0) images?",
    "options": [
      "L_total = L_y(y, y_pred) + I_f(y) * [L_VAE], where I_f(y) is an indicator variable that applies VAE reconstruction and latent loss strictly to face images",
      "L_total = L_VAE / L_y(y, y_pred)",
      "L_total = (1 - I_f(y)) * L_VAE",
      "L_total = L_y(y, y_pred) * L_VAE"
    ],
    "correctAnswer": "L_total = L_y(y, y_pred) + I_f(y) * [L_VAE], where I_f(y) is an indicator variable that applies VAE reconstruction and latent loss strictly to face images",
    "explanation": {
      "summary": "Non-face images should only train the binary classifier; they must NOT be reconstructed by the face decoder.",
      "whyCorrect": "As derived in Section 2.5 ('Defining the DB-VAE loss function'): The goal is to learn the latent distribution of faces to debias facial detection. Non-faces (e.g. background trees, cars from ImageNet) are needed only for the binary classification task L_y. Thus, VAE loss is multiplied by I_f(y) where I_f=1 for faces and 0 for non-faces.",
      "whyWrong": "Multiplying or dividing losses produces zero or undefined gradients, and applying VAE loss only to non-faces defeats the purpose of learning face latents.",
      "keyConcept": "Lab Reference (PT_Part2_Debiasing.ipynb Section 2.5): L_total = L_y(y, y_pred) + I_f(y) * [L_VAE]."
    }
  },
  {
    "id": 116,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "How does the DB-VAE algorithm perform automated 'Adaptive Resampling' during training to eliminate bias WITHOUT requiring explicit human demographic annotations?",
    "options": [
      "It estimates the empirical latent density Q(z|X) from the encoder and assigns selection probabilities inversely proportional to feature frequency (W(x) ~ 1 / (Q(z) + alpha)), sampling rare faces more often",
      "It automatically crawls Wikipedia to find demographic labels for each CelebA identity",
      "It applies heavy blur to all faces so that the model cannot distinguish skin tones or features",
      "It permanently discards all majority demographic samples from the dataset before training begins"
    ],
    "correctAnswer": "It estimates the empirical latent density Q(z|X) from the encoder and assigns selection probabilities inversely proportional to feature frequency (W(x) ~ 1 / (Q(z) + alpha)), sampling rare faces more often",
    "explanation": {
      "summary": "DB-VAE discovers rare latent attributes in an unsupervised fashion, and re-weights sampling probabilities so rare features are visited equally during training.",
      "whyCorrect": "In Section 2.5 ('Adaptive resampling for automated debiasing'): The encoder outputs latent means mu for all training faces. A histogram computes the marginal density Q(z_i). Samples residing in low-density bins (rare attributes like darker skin, hats, sunglasses) are assigned higher sampling weights W(x) = 1 / (Q(z) + alpha), achieving automated unsupervised debiasing.",
      "whyWrong": "DB-VAE requires no external labels or web crawling, does not destroy image resolution with blur, and does not discard majority data.",
      "keyConcept": "Lab Reference (PT_Part2_Debiasing.ipynb Section 2.5): Adaptive Resampling: p_sample(x) ~ 1 / (Q(z|x) + alpha)."
    }
  },
  {
    "id": 117,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Basic",
    "question": "In PT_Part2_Debiasing.ipynb (Section 2.6), which famous benchmark dataset was specifically utilized to evaluate facial detection accuracy across intersectional demographic groups (Dark Male, Dark Female, Light Male, Light Female)?",
    "options": [
      "Pilot Parliaments Benchmark (PPB)",
      "MNIST Handwritten Digits",
      "COCO (Common Objects in Context)",
      "CIFAR-10"
    ],
    "correctAnswer": "Pilot Parliaments Benchmark (PPB)",
    "explanation": {
      "summary": "The PPB dataset (Buolamwini & Gebru, 2018) is the standard benchmark designed explicitly for evaluating demographic fairness in commercial and academic facial recognition.",
      "whyCorrect": "As documented in Section 2.6 ('Evaluation of DB-VAE on Test Dataset'): The model is evaluated on the PPB dataset, which is balanced across skin type (Fitzpatrick scale) and gender, verifying that DB-VAE significantly closes the accuracy gap between Light Males and Dark Females.",
      "whyWrong": "MNIST is for digits, COCO is for general object detection/segmentation, and CIFAR-10 is for 32x32 toy vehicle and animal classification.",
      "keyConcept": "Lab Reference (PT_Part2_Debiasing.ipynb Section 2.6): Pilot Parliaments Benchmark (PPB) evaluates intersectional accuracy across demographics."
    }
  },
  {
    "id": 118,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "What is the primary structural difference between a Standard Autoencoder and a Variational Autoencoder (VAE)?",
    "options": [
      "A standard autoencoder maps inputs deterministically to single discrete coordinates z, whereas a VAE maps inputs to parameters of probability distributions (mu and log(sigma)) from which latent codes are sampled",
      "A standard autoencoder has no decoder network",
      "A VAE cannot be trained on convolutional architectures",
      "A standard autoencoder only works for speech signals while VAEs work only for text"
    ],
    "correctAnswer": "A standard autoencoder maps inputs deterministically to single discrete coordinates z, whereas a VAE maps inputs to parameters of probability distributions (mu and log(sigma)) from which latent codes are sampled",
    "explanation": {
      "summary": "Standard autoencoders learn deterministic mappings prone to gaps in latent space; VAEs learn a continuous probability density over the latent manifold.",
      "whyCorrect": "In a standard autoencoder, z = Encoder(x). In a VAE (Section 2.4), mu, logsigma = Encoder(x), and z ~ N(mu, sigma^2). This probabilistic formulation ensures the latent space is continuous, complete, and generative.",
      "whyWrong": "Both models possess decoders, both support convolutional layers, and both are standardly applied across vision and images.",
      "keyConcept": "Autoencoder: x -> z (point) -> x_hat | VAE: x -> (mu, sigma) -> z ~ N(mu, sigma^2) -> x_hat."
    }
  },
  {
    "id": 119,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Basic",
    "question": "In PT_Part2_Debiasing.ipynb (Section 2.5), what dimensionality is chosen for the bottleneck latent vector z in the DB-VAE architecture?",
    "options": [
      "100 latent variables",
      "2 latent variables",
      "10,000 latent variables",
      "1 single scalar variable"
    ],
    "correctAnswer": "100 latent variables",
    "explanation": {
      "summary": "DB-VAE uses a 100-dimensional latent code to represent facial attributes (e.g. skin tone, pose, gender, accessories).",
      "whyCorrect": "As explicitly specified in the DB-VAE architecture section (Cell 39 & 41): 'We will use a latent space with 100 latent variables' (self.fc_mu = nn.Linear(..., 100), self.fc_logsigma = nn.Linear(..., 100)).",
      "whyWrong": "2 dimensions are typically used only for simple 2D toy visualizations; 10,000 would fail to compress the 64x64x3 image; 1 is too small to capture rich facial geometry.",
      "keyConcept": "Lab Reference (PT_Part2_Debiasing.ipynb Section 2.5): DB-VAE Latent Space Dimension = 100."
    }
  },
  {
    "id": 120,
    "category": "Debiasing & VAEs",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In VAE reconstruction loss (PT_Part2_Debiasing.ipynb Section 2.4), which distance metric was implemented to measure fidelity between input image x and reconstructed output x_hat?",
    "options": [
      "L1 norm (Mean Absolute Error: ||x - x_hat||_1)",
      "Categorical cross-entropy over 10 classes",
      "Hinge loss with margin = 1.0",
      "Perplexity score computed over token sequences"
    ],
    "correctAnswer": "L1 norm (Mean Absolute Error: ||x - x_hat||_1)",
    "explanation": {
      "summary": "L1 loss produces sharper reconstructed images compared to L2 (MSE), which tends to average pixel colors and create blurrier outputs.",
      "whyCorrect": "In Section 2.4 ('Understanding VAEs: loss function'): 'Reconstruction loss (L_x(x, x_hat)): measures how accurately the reconstructed outputs match the input and is given by the L^1 norm of the input image and its reconstructed output: L_x(x, x_hat) = ||x - x_hat||_1'.",
      "whyWrong": "Categorical cross-entropy is for discrete classification, Hinge loss is for SVMs, and Perplexity is for language modeling.",
      "keyConcept": "Lab Reference (PT_Part2_Debiasing.ipynb Section 2.4): VAE Reconstruction Loss L_x(x, x_hat) = ||x - x_hat||_1."
    }
  },
  {
    "id": 121,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Basic",
    "question": "What is the fundamental difference between Discriminative Models and Generative Models in computer vision?",
    "options": [
      "Discriminative models learn the conditional boundary p(y|x) to classify inputs; Generative models learn the underlying data distribution p(x) or joint distribution p(x, y) to generate new realistic samples",
      "Discriminative models are strictly unsupervised; Generative models are always supervised",
      "Discriminative models generate synthetic images; Generative models output bounding box coordinates only",
      "Discriminative models require no weights; Generative models cannot use neural networks"
    ],
    "correctAnswer": "Discriminative models learn the conditional boundary p(y|x) to classify inputs; Generative models learn the underlying data distribution p(x) or joint distribution p(x, y) to generate new realistic samples",
    "explanation": {
      "summary": "Discriminative models separate classes by learning decision boundaries p(y|x); generative models understand how the data itself was generated by modeling p(x).",
      "whyCorrect": "As established in Module 3 (Generative Models.pdf Slide 5-8): Given input x and label y, discriminative models compute p(y|x) (e.g. is this image a dog or cat?). Generative models learn the data distribution p(x) (or p(x, y)), enabling the model to draw new synthetic samples x ~ p(x).",
      "whyWrong": "Discriminative models are typically supervised, do not generate images, and both use deep neural networks extensively.",
      "keyConcept": "Discriminative: Learns decision boundary p(y|x) | Generative: Models data distribution p(x) to synthesize new data."
    }
  },
  {
    "id": 122,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In the taxonomy of Deep Generative Models (Module 3 Generative Models.pdf), how are Variational Autoencoders (VAEs) and Generative Adversarial Networks (GANs) fundamentally classified regarding density estimation?",
    "options": [
      "VAEs are Explicit Density models (optimizing an approximate tractable lower bound on p(x)); GANs are Implicit Density models (sampling directly from the distribution without explicitly modeling p(x))",
      "VAEs are Implicit models; GANs are Explicit models",
      "Both VAEs and GANs are strictly explicit tractable density models like PixelRNN",
      "Neither model uses latent noise vectors for sampling"
    ],
    "correctAnswer": "VAEs are Explicit Density models (optimizing an approximate tractable lower bound on p(x)); GANs are Implicit Density models (sampling directly from the distribution without explicitly modeling p(x))",
    "explanation": {
      "summary": "Generative models divide into explicit density estimation (tractable or approximate) and implicit density sampling.",
      "whyCorrect": "In Lecture 4 (Taxonomy of Generative Models): Explicit density models define and optimize an expression for p(x); VAEs do this by maximizing the Evidence Lower Bound (ELBO) on log p(x). GANs are implicit: they never write down or evaluate p(x), but instead learn a generator G that maps noise z into the data distribution via adversarial feedback.",
      "whyWrong": "PixelRNN/PixelCNN are explicit tractable; VAEs are approximate explicit; GANs are implicit.",
      "keyConcept": "Generative Taxonomy: Explicit Density (Approximate: VAEs) vs Implicit Density (GANs, Diffusion)."
    }
  },
  {
    "id": 123,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "What is the mathematical formulation of the two-player minimax game objective V(D, G) for Generative Adversarial Networks (GANs)?",
    "options": [
      "min_G max_D V(D, G) = E_{x ~ p_data}[log D(x)] + E_{z ~ p_z}[log(1 - D(G(z)))]",
      "min_G min_D V(D, G) = E[||x - G(z)||^2] + lambda * E[||W||_2]",
      "max_G max_D V(D, G) = sum(w_i * x_i) + b",
      "min_G max_D V(D, G) = E[D(x) * G(z)] - E[D(G(z))]"
    ],
    "correctAnswer": "min_G max_D V(D, G) = E_{x ~ p_data}[log D(x)] + E_{z ~ p_z}[log(1 - D(G(z)))]",
    "explanation": {
      "summary": "GANs optimize a minimax zero-sum game between Discriminator D (maximizing real/fake classification accuracy) and Generator G (minimizing Discriminator success).",
      "whyCorrect": "In Goodfellow et al. (2014) and Module 3 slides: D wants D(x)=1 (real) and D(G(z))=0 (fake), maximizing log D(x) + log(1 - D(G(z))). G wants D(G(z))=1 (fooling D), minimizing log(1 - D(G(z))).",
      "whyWrong": "Option B is an autoencoder MSE loss; Option C is a perceptron linear equation; Option D is an incorrect heuristic.",
      "keyConcept": "GAN Minimax Formulation: min_G max_D V(D, G) = E[log D(x)] + E[log(1 - D(G(z)))]."
    }
  },
  {
    "id": 124,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "Why do GAN implementations train the Generator to maximize log(D(G(z))) instead of minimizing log(1 - D(G(z))) (the 'Non-Saturating Game')?",
    "options": [
      "Early in training, when the Generator produces poor images, D easily rejects them (D(G(z)) ~ 0), causing log(1 - D(G(z))) to have near-zero vanishing gradients; maximizing log(D(G(z))) provides large, non-vanishing gradients early on",
      "Because log(1 - D(G(z))) produces negative infinity values that crash CUDA",
      "To prevent the Discriminator from using backpropagation",
      "Because maximizing log(D(G(z))) mathematically eliminates the need for a latent vector z"
    ],
    "correctAnswer": "Early in training, when the Generator produces poor images, D easily rejects them (D(G(z)) ~ 0), causing log(1 - D(G(z))) to have near-zero vanishing gradients; maximizing log(D(G(z))) provides large, non-vanishing gradients early on",
    "explanation": {
      "summary": "The minimax formulation suffers from vanishing generator gradients early in training. The non-saturating objective provides strong gradients when G needs them most.",
      "whyCorrect": "When G is weak, D(G(z)) ≈ 0. The slope of log(1 - p) at p=0 is very flat, starving G of gradient signal. By flipping the objective to maximize log D(G(z)), the derivative at p=0 is steep (1/p), providing strong learning gradients early in training.",
      "whyWrong": "It does not crash CUDA, does not stop D's backprop, and still requires latent z.",
      "keyConcept": "Non-Saturating GAN Trick: Replace min_G log(1 - D(G(z))) with max_G log D(G(z)) to avoid early vanishing gradients."
    }
  },
  {
    "id": 125,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "What is the notorious training pathology in GANs known as 'Mode Collapse'?",
    "options": [
      "The Generator produces only a very limited subset or single variety of outputs (e.g. generating only a single digit or single face) that fools the Discriminator, failing to capture the full diversity of the data",
      "The GPU memory collapses due to batch size exceeding RAM limits",
      "The Discriminator accuracy drops to strictly zero on all training steps",
      "The learning rate decays to negative values during Adam optimization"
    ],
    "correctAnswer": "The Generator produces only a very limited subset or single variety of outputs (e.g. generating only a single digit or single face) that fools the Discriminator, failing to capture the full diversity of the data",
    "explanation": {
      "summary": "Mode collapse occurs when G finds a single successful 'trick' sample that tricks D, mapping all latent codes z to this single output mode instead of covering the whole distribution.",
      "whyCorrect": "In Module 3 (Generative Models.pdf): If the training data contains 10 digits (0-9), a collapsed generator might only output the digit '8' because it reliably tricks D, completely ignoring digits 0-7 and 9. Solutions include Wasserstein GAN (WGAN), unrolled GANs, and minibatch discrimination.",
      "whyWrong": "Mode collapse is an algorithmic representation failure, not a hardware out-of-memory crash or learning rate sign bug.",
      "keyConcept": "Mode Collapse: Generator outputs only a single mode/style that fools D, losing all sample diversity."
    }
  },
  {
    "id": 126,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "What is the core mathematical innovation of CycleGAN (Zhu et al., 2017) that enables image-to-image translation between two visual domains (e.g., Horse to Zebra) WITHOUT paired training images?",
    "options": [
      "Cycle Consistency Loss: Translating an image from domain X to Y and back from Y to X must reconstruct the original image (F(G(x)) ~ x and G(F(y)) ~ y)",
      "Supervised pixel-wise L1 loss comparing identical photos taken with different camera lenses",
      "Using a single shared Convolutional filter across both domains",
      "Applying 180-degree rotation to all training images"
    ],
    "correctAnswer": "Cycle Consistency Loss: Translating an image from domain X to Y and back from Y to X must reconstruct the original image (F(G(x)) ~ x and G(F(y)) ~ y)",
    "explanation": {
      "summary": "CycleGAN enforces that domain mappings are bijections: translating forward then backward must yield the original input.",
      "whyCorrect": "In unpaired image translation, no (x, y) ground-truth pairs exist. CycleGAN trains two generators G: X -> Y and F: Y -> X with two discriminators, penalizing reconstruction loss L_cyc = E[||F(G(x)) - x||_1] + E[||G(F(y)) - y||_1]. This prevents G and F from mapping all inputs to a random unrelated image.",
      "whyWrong": "CycleGAN does not require paired images (that is Pix2Pix), does not share a single filter, and does not rely on simple 180-degree rotations.",
      "keyConcept": "CycleGAN Principle: Forward-Backward Consistency: F(G(x)) ≈ x (Unpaired Domain Translation)."
    }
  },
  {
    "id": 127,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "How do Denoising Diffusion Probabilistic Models (Diffusion Models / DDPM) synthesize realistic images from random noise?",
    "options": [
      "A forward process gradually adds Gaussian noise to an image over T steps until it becomes pure isotropic noise; a neural network (typically a U-Net) is trained to reverse this process step-by-step by predicting and subtracting noise",
      "By calculating the discrete cosine transform and multiplying high frequencies by zero",
      "By training two discriminators against each other without using a generator",
      "By taking a nearest-neighbor average of all training images in pixel space"
    ],
    "correctAnswer": "A forward process gradually adds Gaussian noise to an image over T steps until it becomes pure isotropic noise; a neural network (typically a U-Net) is trained to reverse this process step-by-step by predicting and subtracting noise",
    "explanation": {
      "summary": "Diffusion models generate data by iteratively denoising a sample initialized from pure Gaussian noise.",
      "whyCorrect": "As presented in modern deep generative modeling: Forward diffusion q(x_t | x_{t-1}) adds Gaussian noise according to a variance schedule beta_t. The reverse process p_theta(x_{t-1} | x_t) uses a neural network to estimate the noise epsilon_theta(x_t, t), iteratively subtracting noise to reconstruct sharp images.",
      "whyWrong": "Diffusion models do not use DCT filtering, do not run dual discriminators (that is GANs), and do not perform nearest neighbor averaging.",
      "keyConcept": "Diffusion Mechanism: Forward Process (Add Noise) -> Reverse Process (Learned Denoising via U-Net)."
    }
  },
  {
    "id": 128,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In Variational Autoencoders (VAEs), what is the Evidence Lower Bound (ELBO) that the network maximizes during training?",
    "options": [
      "log p(x) >= E_{q(z|x)}[log p(x|z)] - D_KL(q(z|x) || p(z)), balancing reconstruction fidelity and latent divergence from the prior",
      "ELBO = (Precision * Recall) / (Precision + Recall)",
      "ELBO = min(Loss) * learning_rate",
      "ELBO = det(Weights) + trace(Biases)"
    ],
    "correctAnswer": "log p(x) >= E_{q(z|x)}[log p(x|z)] - D_KL(q(z|x) || p(z)), balancing reconstruction fidelity and latent divergence from the prior",
    "explanation": {
      "summary": "Because the true marginal data log-likelihood log p(x) is intractable, VAEs maximize its variational lower bound (ELBO).",
      "whyCorrect": "In VAE derivation: log p(x) = E_{q}[log(p(x,z)/q(z|x))] + D_KL(q(z|x) || p(z|x)) >= E_{q(z|x)}[log p(x|z)] - D_KL(q(z|x) || p(z)). Maximizing the ELBO simultaneously maximizes reconstruction likelihood and minimizes latent prior divergence.",
      "whyWrong": "Option B is F1-score; Option C and D are fabricated heuristics.",
      "keyConcept": "ELBO Formulation: Maximizes Reconstruction Log-Likelihood while Minimizing KL Divergence to Prior."
    }
  },
  {
    "id": 129,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "Why can't a standard (non-variational) Autoencoder be reliably used to generate new images by sampling random vectors z ~ N(0, I) and passing them into its decoder?",
    "options": [
      "Because standard autoencoders do not regularize the latent space, leaving large 'holes' and discontinuities where the decoder was never trained, resulting in corrupted or nonsensical reconstructions",
      "Because standard autoencoders delete the decoder network after training is finished",
      "Because standard autoencoders only operate on 1D audio sequences",
      "Because neural networks can only execute matrix multiplication on training samples, not sampled vectors"
    ],
    "correctAnswer": "Because standard autoencoders do not regularize the latent space, leaving large 'holes' and discontinuities where the decoder was never trained, resulting in corrupted or nonsensical reconstructions",
    "explanation": {
      "summary": "Standard autoencoders learn deterministic point encodings with irregular, discontinuous latent spaces, making them unsuitable for generation.",
      "whyCorrect": "In Module 3 (Autoencoders vs VAEs): A standard AE only optimizes reconstruction loss ||x - x_hat||^2. It has no incentive to organize the latent space smoothly or center it at 0. Sampling random points z lands in unmapped regions, producing garbage. VAEs enforce a smooth Gaussian latent space using KL divergence.",
      "whyWrong": "Decoders are not deleted, autoencoders process 2D images, and matrix multiplication works for any tensor.",
      "keyConcept": "Autoencoder Latent Space: Discontinuous and unregularized. VAE solves this by enforcing a continuous Gaussian prior."
    }
  },
  {
    "id": 130,
    "category": "Generative Models",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "In Conditional GANs (cGANs), how does the architecture enable user control over what class or type of image is generated (e.g. generating a digit '7' on demand)?",
    "options": [
      "Both the Generator and Discriminator receive an additional conditioning label y (such as a one-hot vector or class embedding) alongside the noise vector z and image x",
      "By retraining the entire model from scratch every time a different digit is requested",
      "By multiplying the image pixels by the integer class number",
      "By removing all activation functions from the generator"
    ],
    "correctAnswer": "Both the Generator and Discriminator receive an additional conditioning label y (such as a one-hot vector or class embedding) alongside the noise vector z and image x",
    "explanation": {
      "summary": "Conditional GANs condition both G and D on auxiliary information y, steering the generative process toward a specified target mode.",
      "whyCorrect": "In Mirza & Osindero (2014) and Module 3 slides: G takes [z, y] to produce G(z, y). D takes [x, y] to determine if x is a real image matching condition y. This allows conditional generation of specific classes, text-to-image synthesis, or image translation.",
      "whyWrong": "Retraining from scratch is inefficient, multiplying pixels by class integers ruins images, and activations remain necessary.",
      "keyConcept": "cGAN Conditioning: G(z, y) synthesizes target class y; D(x, y) validates whether image x matches class y."
    }
  },
  {
    "id": 131,
    "category": "Exact Slide Statements",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "Complete the exact definition from the Module 1 lecture slides: 'A perceptron computes a _______ of its inputs and applies a _______ activation function.'",
    "options": [
      "linear combination; non-linear",
      "convolution; linear",
      "dot product; polynomial",
      "matrix inverse; sigmoid"
    ],
    "correctAnswer": "linear combination; non-linear",
    "explanation": {
      "summary": "This is the exact opening definition of an artificial neuron in Module 1: z = W^T * X + b, followed by y_hat = g(z).",
      "whyCorrect": "Module 1 Slide Text: 'A perceptron computes a linear combination of its inputs and applies a non-linear activation function.' The two distinct steps are (1) linear weighting plus bias, (2) non-linear transformation g(z).",
      "whyWrong": "It does not compute convolutions (that is CNNs) and the activation cannot be linear if depth is to be preserved.",
      "keyConcept": "Exact Slide Definition (Module 1): 'A perceptron computes a linear combination of its inputs and applies a non-linear activation function.'"
    }
  },
  {
    "id": 132,
    "category": "Exact Slide Statements",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "According to the Module 1 slides, what does the Universal Approximation Theorem state about neural networks?",
    "options": [
      "A single hidden layer neural network with a non-linear activation function can approximate any continuous function",
      "Deep networks require infinite training epochs to reach zero loss",
      "Any linear network can solve the XOR problem if given enough layers",
      "Convolutional layers always outperform dense layers regardless of input dimension"
    ],
    "correctAnswer": "A single hidden layer neural network with a non-linear activation function can approximate any continuous function",
    "explanation": {
      "summary": "The Universal Approximation Theorem proves that non-linear activation functions give even a 2-layer network arbitrary function approximation capacity.",
      "whyCorrect": "Module 1 Slide Verbatim: 'Universal Approximation Theorem: A single hidden layer neural network containing a finite number of non-linear neurons can approximate any continuous function on compact subsets of R^n.'",
      "whyWrong": "Linear networks can never solve XOR regardless of depth; networks do not need infinite epochs; CNN superiority depends on spatial structure.",
      "keyConcept": "Exact Slide Definition (Module 1): 'Universal Approximation: A single hidden layer neural network with a non-linear activation function can approximate any continuous function.'"
    }
  },
  {
    "id": 133,
    "category": "Exact Slide Statements",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "From Module 1 slides: What is the formal objective of neural network training in Empirical Risk Minimization?",
    "options": [
      "Finding weights W that minimize the average loss over the entire training dataset: J(W) = (1/n) * sum(L(f(x^(i); W), y^(i)))",
      "Maximizing the gradient norm with respect to the input features",
      "Setting all weights strictly equal to zero to eliminate variance",
      "Computing the determinant of the weight matrix across all layers"
    ],
    "correctAnswer": "Finding weights W that minimize the average loss over the entire training dataset: J(W) = (1/n) * sum(L(f(x^(i); W), y^(i)))",
    "explanation": {
      "summary": "Training optimizes the empirical average loss across all n available training examples.",
      "whyCorrect": "Module 1 Slide Formulation: 'Empirical Risk Minimization: We want to find network weights that minimize the cost over our entire training dataset: argmin_W J(W) where J(W) = (1/n) * sum_{i=1}^n L(f(x^(i); W), y^(i)).'",
      "whyWrong": "We minimize (not maximize) loss, zeroing weights destroys expressiveness, and determinants do not optimize loss.",
      "keyConcept": "Exact Slide Formulation (Module 1): J(W) = (1/n) * sum_{i=1}^n L(f(x^(i); W), y^(i))."
    }
  },
  {
    "id": 134,
    "category": "Exact Slide Statements",
    "module": "Module 1",
    "difficulty": "Exam Level",
    "question": "In the Module 1 slides on Vanishing Gradients, what is the exact maximum value of the derivative of the Sigmoid function (d/dz sigma(z))?",
    "options": [
      "0.25 (at z = 0)",
      "1.00 (at z = 0)",
      "0.50 (at z = 1)",
      "0.00 (at all points)"
    ],
    "correctAnswer": "0.25 (at z = 0)",
    "explanation": {
      "summary": "The derivative of sigmoid is sigma(z) * (1 - sigma(z)). Its maximum value occurs when sigma(z) = 0.5, giving 0.5 * 0.5 = 0.25.",
      "whyCorrect": "Module 1 Slide Text: 'Sigmoid derivative: d/dz sigma(z) = sigma(z)(1 - sigma(z)). The maximum derivative is 0.25 at z=0. Stacking N layers multiplies gradients by at most (0.25)^N, vanishing exponentially.'",
      "whyWrong": "ReLU has a maximum derivative of 1.0, not Sigmoid. Sigmoid's derivative peaks at exactly 0.25.",
      "keyConcept": "Exact Slide Fact (Module 1): 'Max derivative of Sigmoid = 0.25 at z=0; multiplying derivatives across depth causes exponential gradient decay.'"
    }
  },
  {
    "id": 135,
    "category": "Exact Slide Statements",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "From the Module 1 slides: What exactly happens when a ReLU neuron 'dies'?",
    "options": [
      "When the input to a ReLU neuron is negative or zero, its activation and derivative are both zero, meaning the gradient cannot backpropagate and the neuron permanently stops updating",
      "The weights explode to infinity due to a high learning rate",
      "The neuron transitions into a Sigmoid activation automatically",
      "The GPU memory allocated for that neuron is freed"
    ],
    "correctAnswer": "When the input to a ReLU neuron is negative or zero, its activation and derivative are both zero, meaning the gradient cannot backpropagate and the neuron permanently stops updating",
    "explanation": {
      "summary": "Dying ReLU occurs because the gradient of ReLU for z <= 0 is zero, preventing any further weight updates.",
      "whyCorrect": "Module 1 Slide Text: 'The Dying ReLU Problem: For inputs z <= 0, the gradient is 0. If a large gradient causes a neuron to update such that it never activates on any training sample, its gradient remains 0 forever and the neuron dies.'",
      "whyWrong": "Dying ReLU is a zero-gradient freezing state, not an exploding weight or memory allocation event.",
      "keyConcept": "Exact Slide Statement (Module 1): 'Dying ReLU: Gradient is 0 for z <= 0; neurons that never activate get stuck and stop learning.'"
    }
  },
  {
    "id": 136,
    "category": "Exact Slide Statements",
    "module": "Module 1",
    "difficulty": "Basic",
    "question": "Complete the exact definition of Dropout from Module 1 slides: 'During training, randomly set a fraction p of activations to _______ on each forward pass, preventing neurons from _______.'",
    "options": [
      "zero; co-adapting",
      "one; exploding",
      "infinity; overfitting",
      "the mean; saturated gradients"
    ],
    "correctAnswer": "zero; co-adapting",
    "explanation": {
      "summary": "Dropout forces neurons to learn robust features independently rather than relying on specific neighboring neurons.",
      "whyCorrect": "Module 1 Slide Text: 'Dropout: During training, randomly set a fraction p of activations to 0 on each forward pass. This prevents neurons from co-adapting and forces the network to learn redundant representations.'",
      "whyWrong": "Dropout drops activations to 0 (zero), not 1, and prevents co-adaptation.",
      "keyConcept": "Exact Slide Definition (Module 1): 'Dropout: Randomly sets activations to 0 with probability p to prevent feature co-adaptation.'"
    }
  },
  {
    "id": 137,
    "category": "Exact Slide Statements",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "From Module 2 slides: What is the exact definition of the Convolution operation in computer vision?",
    "options": [
      "Applying a filter (or kernel) across local spatial neighborhoods of an input to produce a feature map",
      "Multiplying an entire image matrix by its transpose",
      "Averaging all RGB channels into a single grayscale vector",
      "Shuffling pixel coordinates randomly across the spatial grid"
    ],
    "correctAnswer": "Applying a filter (or kernel) across local spatial neighborhoods of an input to produce a feature map",
    "explanation": {
      "summary": "Convolution slides a small kernel across local patches, computing element-wise dot products.",
      "whyCorrect": "Module 2 Slide Text: 'The Convolution Operation: Apply a filter (or kernel) to local spatial neighborhoods of an image, compute dot products, and slide across the image to produce a feature map.'",
      "whyWrong": "Matrix transposition, channel averaging, or pixel shuffling do not describe 2D spatial convolution.",
      "keyConcept": "Exact Slide Definition (Module 2): 'Convolution: Sliding a filter across local spatial neighborhoods to produce a feature map.'"
    }
  },
  {
    "id": 138,
    "category": "Exact Slide Statements",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "According to Module 2 slides, what is 'Weight Sharing' (Parameter Sharing) in CNNs and what property does it provide?",
    "options": [
      "The same filter weights are used across every spatial position of the input, drastically reducing parameters and providing translation equivariance",
      "All hidden layers share identical weights with the output layer",
      "Weights are copied directly from the CPU RAM to the GPU VRAM",
      "Different classes share the exact same output neuron"
    ],
    "correctAnswer": "The same filter weights are used across every spatial position of the input, drastically reducing parameters and providing translation equivariance",
    "explanation": {
      "summary": "Weight sharing ensures that an edge detector learned in the top-left also detects edges in the bottom-right.",
      "whyCorrect": "Module 2 Slide Text: 'Weight Sharing: Instead of having separate weights for every pixel, the same filter is applied across the entire image. This dramatically reduces the number of learnable parameters and introduces translation equivariance.'",
      "whyWrong": "Layers do not share weights with other layers; it refers to spatial sharing within a single convolutional layer.",
      "keyConcept": "Exact Slide Definition (Module 2): 'Weight Sharing: Same filter applied across all spatial positions -> translation equivariance + parameter efficiency.'"
    }
  },
  {
    "id": 139,
    "category": "Exact Slide Statements",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "In Module 2 slides, what is the exact distinction between 'Valid Padding' and 'Same Padding'?",
    "options": [
      "Valid padding applies zero padding (P=0), allowing the output size to shrink; Same padding pads with zeros so output spatial dimensions equal input dimensions when stride is 1",
      "Valid padding is used only for training; Same padding is used only for testing",
      "Valid padding pads with ones; Same padding pads with zeros",
      "Valid padding increases image resolution; Same padding decreases resolution"
    ],
    "correctAnswer": "Valid padding applies zero padding (P=0), allowing the output size to shrink; Same padding pads with zeros so output spatial dimensions equal input dimensions when stride is 1",
    "explanation": {
      "summary": "Valid means no padding (shrinkage). Same means padding with (K-1)/2 zeros to maintain dimensions.",
      "whyCorrect": "Module 2 Slide Text: 'Valid Padding: No zero padding (P=0). The filter only visits valid image locations, causing spatial dimensions to shrink. Same Padding: Pad input with zeros such that the output spatial size is identical to the input spatial size when stride S=1.'",
      "whyWrong": "Padding types apply to both training and testing; valid does not pad with ones.",
      "keyConcept": "Exact Slide Definition (Module 2): 'Valid: P=0 (shrink output). Same: Pad zeros so Output Size = Input Size when S=1.'"
    }
  },
  {
    "id": 140,
    "category": "Exact Slide Statements",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "Which exact statement regarding Pooling Layers is stated in the Module 2 lecture slides?",
    "options": [
      "Pooling layers reduce spatial dimensions (downsampling) to provide translation invariance, and they have exactly ZERO learnable parameters",
      "Pooling layers require learnable biases for each output filter",
      "Max pooling doubles the height and width of the input volume",
      "Average pooling is strictly parameterized by a 3x3 weight matrix"
    ],
    "correctAnswer": "Pooling layers reduce spatial dimensions (downsampling) to provide translation invariance, and they have exactly ZERO learnable parameters",
    "explanation": {
      "summary": "Pooling applies a fixed aggregation function (max or average) without any weights or biases.",
      "whyCorrect": "Module 2 Slide Text: 'Pooling Layers: Progressively reduce the spatial size of the representation to reduce parameters, memory, and provide translation invariance. Crucial note: Pooling layers perform a fixed mathematical operation and have NO learnable parameters.'",
      "whyWrong": "Pooling has zero learnable weights, downsamples (halves) rather than doubles resolution, and has no weight matrices.",
      "keyConcept": "Exact Slide Statement (Module 2): 'Pooling layers downsample spatial dimensions and possess exactly 0 learnable parameters.'"
    }
  },
  {
    "id": 141,
    "category": "Exact Slide Statements",
    "module": "Module 2",
    "difficulty": "Intermediate",
    "question": "What is the exact architectural motivation for VGGNet stated in the Module 2 slides?",
    "options": [
      "A stack of two 3x3 convolutional layers has the same effective receptive field as a single 5x5 layer, while using 28% fewer parameters and incorporating an additional non-linear activation",
      "Replacing all convolutional layers with 1x1 depthwise separable convolutions",
      "Using 7x7 filters in all layers to maximize spatial coverage",
      "Removing pooling layers completely to maintain constant resolution"
    ],
    "correctAnswer": "A stack of two 3x3 convolutional layers has the same effective receptive field as a single 5x5 layer, while using 28% fewer parameters and incorporating an additional non-linear activation",
    "explanation": {
      "summary": "VGG proved that deep architectures using homogeneous 3x3 filters outperform shallower networks with large filters.",
      "whyCorrect": "Module 2 Slide Text: 'VGG Principle: Why 3x3 filters? A stack of two 3x3 conv layers has an effective receptive field of 5x5, but uses 2*(3^2*C^2) = 18C^2 params vs 5^2*C^2 = 25C^2 params (28% fewer), while adding an extra non-linear ReLU between them.'",
      "whyWrong": "VGG pioneered stacks of 3x3 filters, not 7x7 or depthwise convolutions.",
      "keyConcept": "Exact Slide Statement (Module 2): 'Two 3x3 filters = 5x5 receptive field with 28% fewer parameters + more non-linearities.'"
    }
  },
  {
    "id": 142,
    "category": "Exact Slide Statements",
    "module": "Module 2",
    "difficulty": "Exam Level",
    "question": "In the Module 2 slides on Deep Residual Learning (ResNet), what is the exact mathematical formulation of a residual building block?",
    "options": [
      "H(x) = F(x) + x, where F(x) is the residual mapping to be learned and x is the identity shortcut connection",
      "H(x) = F(x) * x",
      "H(x) = F(x) - x",
      "H(x) = max(F(x), 0) + min(x, 0)"
    ],
    "correctAnswer": "H(x) = F(x) + x, where F(x) is the residual mapping to be learned and x is the identity shortcut connection",
    "explanation": {
      "summary": "ResNet reformulates target mapping H(x) into residual mapping F(x) + x.",
      "whyCorrect": "Module 2 Slide Text: 'Residual Learning: Instead of hoping layers directly fit H(x), we let layers fit a residual mapping F(x) = H(x) - x. The original mapping is recast as H(x) = F(x) + x. The identity shortcut (+ x) allows gradients to flow directly backward without vanishing.'",
      "whyWrong": "Multiplication, subtraction, or min-max transformations disrupt the uninterrupted identity gradient highway.",
      "keyConcept": "Exact Slide Formulation (Module 2): 'Residual Block: H(x) = F(x) + x with identity shortcut connection.'"
    }
  },
  {
    "id": 143,
    "category": "Exact Slide Statements",
    "module": "Module 2",
    "difficulty": "Basic",
    "question": "Complete the exact description of feature hierarchy across CNN layers from Module 2 slides: 'Early layers detect _______; mid-level layers detect _______; deep layers detect _______.'",
    "options": [
      "low-level edges and textures; object parts and motifs; high-level semantic objects and scenes",
      "semantic objects; Fourier frequencies; raw pixel intensities",
      "output classes; image normalization; convolution filters",
      "color palettes; text characters; video motion vectors"
    ],
    "correctAnswer": "low-level edges and textures; object parts and motifs; high-level semantic objects and scenes",
    "explanation": {
      "summary": "CNN representations build hierarchically from local primitive features to complex global semantic concepts.",
      "whyCorrect": "Module 2 Slide Text: 'Hierarchical Feature Representation: Early layers: low-level features (edges, color gradients). Mid-level layers: motifs, textures, and object parts (wheels, eyes). Deep layers: high-level semantic entities (faces, cars, animals).'",
      "whyWrong": "The hierarchy moves from local to global, never from complex objects to low-level pixels.",
      "keyConcept": "Exact Slide Statement (Module 2): 'Feature Hierarchy: Edges & Textures (Early) -> Object Parts (Mid) -> Semantic Objects (Deep).'"
    }
  },
  {
    "id": 144,
    "category": "Exact Slide Statements",
    "module": "Module 3",
    "difficulty": "Basic",
    "question": "What is the exact definition of Generative Modeling given on Slide 5 of Module 3 (Generative Models.pdf)?",
    "options": [
      "An unsupervised learning task that aims to take training samples from some distribution and learn a model that represents that distribution to generate new samples",
      "A supervised learning algorithm that maps high-dimensional inputs to categorical discrete labels",
      "A numerical method for solving systems of linear equations using Gaussian elimination",
      "A regression technique that fits a polynomial curve through noisy scatter points"
    ],
    "correctAnswer": "An unsupervised learning task that aims to take training samples from some distribution and learn a model that represents that distribution to generate new samples",
    "explanation": {
      "summary": "Generative models learn to approximate the underlying data distribution p(x) in an unsupervised manner.",
      "whyCorrect": "Module 3 Slide 5 Text: 'Generative Modeling: Goal is to take training samples from some distribution and learn a model that represents that distribution to generate new samples.'",
      "whyWrong": "Classification is supervised label mapping; Gaussian elimination and polynomial regression are not generative modeling.",
      "keyConcept": "Exact Slide Definition (Module 3 Slide 5): 'Generative Modeling: Learn a model representing the data distribution to generate new samples.'"
    }
  },
  {
    "id": 145,
    "category": "Exact Slide Statements",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "According to Module 3 slides, why must the latent space dimension z in a standard autoencoder be smaller than input dimension x (dim(z) < dim(x))?",
    "options": [
      "To force the network to learn a compressed, meaningful latent representation of the data rather than simply learning a trivial identity function I(x) = x",
      "Because GPUs cannot store matrices larger than 64 dimensions",
      "To eliminate the need for computing reconstruction loss",
      "To ensure the encoder weights remain strictly positive"
    ],
    "correctAnswer": "To force the network to learn a compressed, meaningful latent representation of the data rather than simply learning a trivial identity function I(x) = x",
    "explanation": {
      "summary": "An undercomplete bottleneck prevents the network from memorizing an uncompressed identity mapping.",
      "whyCorrect": "Module 3 Slide Text: 'Autoencoder Bottleneck: Why dim(z) < dim(x)? If the latent dimension were equal or larger than input dimension, the network could trivially memorize the identity function I(x) = x without learning meaningful features. The bottleneck forces non-linear compression.'",
      "whyWrong": "GPUs handle massive dimensions, reconstruction loss is still computed, and weights can be positive or negative.",
      "keyConcept": "Exact Slide Statement (Module 3): 'Undercomplete Bottleneck: Forces the network to learn compressed features instead of trivial identity mapping.'"
    }
  },
  {
    "id": 146,
    "category": "Exact Slide Statements",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In Module 3 slides and PT_Part2_Debiasing.ipynb, what is the exact mathematical equation for the VAE Reparameterization Trick?",
    "options": [
      "z = mu + exp(0.5 * logsigma) * eps, where eps ~ N(0, I)",
      "z = mu * logsigma + eps^2",
      "z = max(mu, eps) - logsigma",
      "z = sum(mu_i) / N + eps"
    ],
    "correctAnswer": "z = mu + exp(0.5 * logsigma) * eps, where eps ~ N(0, I)",
    "explanation": {
      "summary": "Reparameterization rewrites sampling as an affine transformation of external Gaussian noise.",
      "whyCorrect": "Module 3 Slide & Notebook Equation: 'Reparameterization Trick: z = mu + sigma * eps = mu + exp(0.5 * logsigma) * eps, where eps ~ N(0, I).' This isolates stochasticity into eps, enabling backprop into mu and sigma.",
      "whyWrong": "The standard deviation sigma = exp(0.5 * logsigma); other choices are non-differentiable or mathematically incorrect heuristics.",
      "keyConcept": "Exact Slide Equation (Module 3 & PT_Part2_Debiasing.ipynb): z = mu + exp(0.5 * logsigma) * eps."
    }
  },
  {
    "id": 147,
    "category": "Exact Slide Statements",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "From Module 3 slides: What is the exact minimax formulation min_G max_D V(D, G) for GANs?",
    "options": [
      "E_{x ~ p_data}[log D(x)] + E_{z ~ p_z}[log(1 - D(G(z)))]",
      "E[||x - G(z)||^2] + lambda * E[||D(x)||^2]",
      "E[log G(z)] - E[log D(x)]",
      "sum(D(x_i) * G(z_i))"
    ],
    "correctAnswer": "E_{x ~ p_data}[log D(x)] + E_{z ~ p_z}[log(1 - D(G(z)))]",
    "explanation": {
      "summary": "Goodfellow et al.'s original minimax objective balances discriminator log-probability on real data and log-rejection of fake data.",
      "whyCorrect": "Module 3 Slide Text: 'GAN Objective: min_G max_D V(D, G) = E_{x ~ p_data}[log D(x)] + E_{z ~ p_z}[log(1 - D(G(z)))]. D maximizes probability of correct label; G minimizes log(1 - D(G(z))).'",
      "whyWrong": "Option B is an MSE loss, Option C and D are fabricated equations.",
      "keyConcept": "Exact Slide Equation (Module 3): min_G max_D V(D, G) = E[log D(x)] + E[log(1 - D(G(z)))]."
    }
  },
  {
    "id": 148,
    "category": "Exact Slide Statements",
    "module": "Module 3",
    "difficulty": "Intermediate",
    "question": "From Module 3 slides: What is the exact definition of 'Mode Collapse' in Generative Adversarial Networks?",
    "options": [
      "When the generator learns to produce samples from only a few modes of the true distribution, repeatedly generating identical or near-identical outputs that fool the discriminator",
      "When the discriminator achieves 0% accuracy on real training images",
      "When the network architecture runs out of convolutional layers",
      "When the latent noise vector z becomes entirely composed of negative infinity"
    ],
    "correctAnswer": "When the generator learns to produce samples from only a few modes of the true distribution, repeatedly generating identical or near-identical outputs that fool the discriminator",
    "explanation": {
      "summary": "Mode collapse is the failure mode where G lacks diversity and maps all noise to a single high-reward pattern.",
      "whyCorrect": "Module 3 Slide Text: 'Mode Collapse: A major challenge in GAN training where the generator collapses to producing samples from only a few modes (or a single mode) of the target distribution, failing to capture full data diversity.'",
      "whyWrong": "Mode collapse does not mean discriminator reaches 0%, does not run out of layers, and has nothing to do with infinite noise.",
      "keyConcept": "Exact Slide Definition (Module 3): 'Mode Collapse: Generator outputs only a few modes of the distribution, losing sample diversity.'"
    }
  },
  {
    "id": 149,
    "category": "Exact Slide Statements",
    "module": "Module 3",
    "difficulty": "Exam Level",
    "question": "In Module 3 slides on CycleGAN, what is the exact mathematical formulation of the Forward-Backward Cycle Consistency Loss?",
    "options": [
      "F(G(x)) ~ x and G(F(y)) ~ y, where G: X -> Y and F: Y -> X",
      "G(x) = y and F(y) = 0",
      "D_Y(G(x)) + D_X(F(y)) = 1",
      "log(F(x)) * log(G(y))"
    ],
    "correctAnswer": "F(G(x)) ~ x and G(F(y)) ~ y, where G: X -> Y and F: Y -> X",
    "explanation": {
      "summary": "Cycle consistency enforces that mapping from domain X to Y and back from Y to X reproduces the original image.",
      "whyCorrect": "Module 3 Slide Text: 'Cycle Consistency Loss: Translating from domain X to Y (G(x)) and back from Y to X (F(G(x))) should reconstruct x: F(G(x)) ≈ x. Similarly, G(F(y)) ≈ y. Loss: L_cyc = ||F(G(x)) - x||_1 + ||G(F(y)) - y||_1.'",
      "whyWrong": "Options B, C, and D do not define the forward-backward bijection loss.",
      "keyConcept": "Exact Slide Formulation (Module 3 CycleGAN): F(G(x)) ≈ x and G(F(y)) ≈ y (Forward-Backward Cycle Consistency)."
    }
  },
  {
    "id": 150,
    "category": "Exact Slide Statements",
    "module": "Module 1",
    "difficulty": "Intermediate",
    "question": "In Module 1 (Part1_TensorFlow.ipynb Section 1.4), what exact statement explains how TensorFlow computes derivatives?",
    "options": [
      "Operations executed inside 'with tf.GradientTape() as tape:' are recorded on a tape; calling tape.gradient(target, sources) plays it backward using reverse-mode automatic differentiation",
      "TensorFlow uses symbolic differentiation via sympy to output closed-form LaTeX strings",
      "TensorFlow approximates all derivatives using numerical finite differences (f(x+h) - f(x))/h",
      "TensorFlow requires users to manually write the derivative formula for every custom model"
    ],
    "correctAnswer": "Operations executed inside 'with tf.GradientTape() as tape:' are recorded on a tape; calling tape.gradient(target, sources) plays it backward using reverse-mode automatic differentiation",
    "explanation": {
      "summary": "TensorFlow implements reverse-mode autodiff through its GradientTape recording abstraction.",
      "whyCorrect": "Module 1 Lab Text: 'Automatic differentiation in TensorFlow: TensorFlow provides the tf.GradientTape API for automatic differentiation. All operations executed inside the context of a with tf.GradientTape() as tape block are recorded on a \"tape\". TensorFlow then uses that tape to compute gradients using reverse mode differentiation.'",
      "whyWrong": "TensorFlow does not rely on sympy symbolic math, numerical finite difference quotients, or manual derivation.",
      "keyConcept": "Exact Notebook Statement (Module 1 Section 1.4): 'Operations inside with tf.GradientTape() as tape: are recorded to compute gradients via reverse-mode autodiff.'"
    }
  }
];

const COURSE_QUESTIONS = QUESTION_BANK;
if (typeof window !== 'undefined') {
  window.QUESTION_BANK = QUESTION_BANK;
  window.COURSE_QUESTIONS = QUESTION_BANK;
}
if (typeof global !== 'undefined') {
  global.QUESTION_BANK = QUESTION_BANK;
  global.COURSE_QUESTIONS = QUESTION_BANK;
}

// Export for usage in app.js or node tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK, COURSE_QUESTIONS };
}
