const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function requestAIMatch(startupId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/matches/generate/${startupId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache 'no-store' ensures we always fetch the latest from the AI engine
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || 'Failed to generate AI match');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating AI match:', error);
    throw error;
  }
}

export async function approveMatch(matchId: string, adminId: string) {
  try {
    // Note: Assuming a POST endpoint on the backend for approval although not explicitly 
    // implemented in main.py in previous stages, we match the requirement spec constraints.
    // If the backend had `/api/matches/approve`, we'd route it here.
    const response = await fetch(`${API_BASE_URL}/api/matches/approve/${matchId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ admin_id: adminId })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || 'Failed to approve match');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error approving match:', error);
    throw error;
  }
}
