#!/usr/bin/env python3
"""Generate Thrive architecture diagrams as high-quality images"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import matplotlib.lines as mlines

# Set up the style
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Arial', 'Helvetica']

def create_platform_overview():
    """Create the platform overview diagram"""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # Title
    ax.text(5, 9.5, 'Thrive Platform Overview',
            fontsize=20, fontweight='bold', ha='center')

    # Assessment Intelligence (top)
    assessment = FancyBboxPatch((3.5, 8), 3, 0.7,
                                boxstyle="round,pad=0.1",
                                facecolor='yellow',
                                edgecolor='black', linewidth=2)
    ax.add_patch(assessment)
    ax.text(5, 8.35, 'Assessment & Routing Intelligence\n(Core IP)',
            fontsize=11, fontweight='bold', ha='center', va='center')

    # Arrows down
    ax.arrow(5, 8, 0, -0.5, head_width=0.15, head_length=0.1, fc='gray', ec='gray')

    # Three tiers
    tiers = [
        {'x': 1.5, 'label': 'Wellness Tier\n85-90%', 'color': '#4ecdc4'},
        {'x': 4.5, 'label': 'Coaching Tier\n15-25%', 'color': '#764ba2'},
        {'x': 7.5, 'label': 'Clinical Tier\n10-15%', 'color': '#ffa500'}
    ]

    for tier in tiers:
        box = FancyBboxPatch((tier['x']-0.7, 6.5), 1.4, 0.6,
                            boxstyle="round,pad=0.05",
                            facecolor=tier['color'],
                            edgecolor='black', linewidth=2)
        ax.add_patch(box)
        ax.text(tier['x'], 6.8, tier['label'],
                fontsize=10, fontweight='bold', ha='center', va='center', color='white')

        # Arrow down
        ax.arrow(tier['x'], 6.5, 0, -0.3, head_width=0.1, head_length=0.08, fc='gray', ec='gray')

    # Services
    services = [
        # Wellness
        {'x': 1.5, 'y': 5.5, 'label': 'ClearMinds\n91K users', 'color': '#4ecdc4'},
        {'x': 1.5, 'y': 4.5, 'label': 'Cowch.app\nIMAGINE', 'color': '#4ecdc4'},
        {'x': 1.5, 'y': 3.5, 'label': 'Limitless\nTom\'s 13', 'color': '#4ecdc4'},
        # Coaching
        {'x': 4.5, 'y': 5.5, 'label': 'Broadbanc\nConsciousness', 'color': '#764ba2'},
        {'x': 4.5, 'y': 4.5, 'label': 'Superheroes\nLife Coaches', 'color': '#764ba2'},
        {'x': 4.5, 'y': 3.5, 'label': 'Jonathan Kemp\nTBD', 'color': '#764ba2'},
        # Clinical
        {'x': 7.5, 'y': 5.5, 'label': 'Concierge Health\nMedical Umbrella', 'color': '#ffa500'},
        {'x': 7.5, 'y': 4.5, 'label': 'Smart Start Minds\nClinical Hyp', 'color': '#ffa500'},
        {'x': 7.5, 'y': 3.5, 'label': 'Goodbody Clinic\nPhysical Health', 'color': '#ffa500'},
    ]

    for service in services:
        box = FancyBboxPatch((service['x']-0.65, service['y']-0.25), 1.3, 0.5,
                            boxstyle="round,pad=0.05",
                            facecolor='white',
                            edgecolor=service['color'], linewidth=2.5)
        ax.add_patch(box)
        ax.text(service['x'], service['y'], service['label'],
                fontsize=8.5, ha='center', va='center', color=service['color'], fontweight='bold')

    # Info box
    info_box = FancyBboxPatch((0.5, 0.5), 9, 1.8,
                              boxstyle="round,pad=0.1",
                              facecolor='#fff8e1',
                              edgecolor='#ffc107', linewidth=2)
    ax.add_patch(info_box)
    ax.text(5, 2.1, 'Key Insight', fontsize=12, fontweight='bold', ha='center', color='#f57c00')
    ax.text(5, 1.3, 'Thrive is a PLATFORM, not a single product.\nThe assessment layer is the core IP that intelligently routes employees\nto the right combination of content, coaching, and clinical services.',
            fontsize=9, ha='center', va='center', style='italic')

    plt.tight_layout()
    plt.savefig('/Users/tomcassidy/thrive/thrive-work/architecture/diagrams/01-platform-overview.png',
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✓ Created platform overview")

def create_decision_tree():
    """Create the decision tree diagram"""
    fig, ax = plt.subplots(figsize=(12, 8))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # Title
    ax.text(5, 9.5, 'Decision Tree - Employee Routing',
            fontsize=20, fontweight='bold', ha='center')

    # Neuroindicator
    neuro = FancyBboxPatch((3.5, 8), 3, 0.6,
                          boxstyle="round,pad=0.1",
                          facecolor='#667eea',
                          edgecolor='black', linewidth=2)
    ax.add_patch(neuro)
    ax.text(5, 8.3, 'NEUROINDICATOR ASSESSMENT\nTriage (5-10 min)',
            fontsize=11, fontweight='bold', ha='center', va='center', color='white')

    # Three pathways
    pathways = [
        {'x': 1.5, 'label': 'CRISIS\n2-3%', 'color': '#ff6b6b'},
        {'x': 5, 'label': 'CLINICAL\n10-15%', 'color': '#ffa500'},
        {'x': 8.5, 'label': 'WELLNESS\n85-90%', 'color': '#4ecdc4'}
    ]

    for path in pathways:
        # Arrow
        ax.arrow(5, 8, path['x']-5, -1.5, head_width=0.15, head_length=0.1,
                fc='gray', ec='gray', linewidth=2)

        # Box
        box = FancyBboxPatch((path['x']-0.6, 5.8), 1.2, 0.6,
                            boxstyle="round,pad=0.05",
                            facecolor=path['color'],
                            edgecolor='black', linewidth=2)
        ax.add_patch(box)
        ax.text(path['x'], 6.1, path['label'],
                fontsize=11, fontweight='bold', ha='center', va='center', color='white')

        # Arrow down
        ax.arrow(path['x'], 5.8, 0, -0.5, head_width=0.12, head_length=0.08, fc='gray', ec='gray')

    # Support descriptions
    supports = [
        {'x': 1.5, 'y': 4.5, 'title': 'Immediate Support',
         'items': ['• Crisis hotline', '• Safety resources', '• Emergency services', '• Follow-up scheduling'],
         'color': '#ff6b6b'},
        {'x': 5, 'y': 4.5, 'title': 'Concierge Health',
         'items': ['• Smart Start Minds', '• Clinical hypnotherapy', '• Goodbody Clinic', '• GP referrals'],
         'color': '#ffa500'},
        {'x': 8.5, 'y': 4.5, 'title': 'Thrive Wellness',
         'items': ['• ClearMinds content', '• Cowch.app', '• Limitless programme', '• Coaching access'],
         'color': '#4ecdc4'}
    ]

    for support in supports:
        box = FancyBboxPatch((support['x']-0.9, support['y']-1), 1.8, 1.8,
                            boxstyle="round,pad=0.08",
                            facecolor='white',
                            edgecolor=support['color'], linewidth=2.5)
        ax.add_patch(box)
        ax.text(support['x'], support['y']+0.6, support['title'],
                fontsize=10, fontweight='bold', ha='center', color=support['color'])
        for i, item in enumerate(support['items']):
            ax.text(support['x'], support['y']+0.2-i*0.35, item,
                    fontsize=8, ha='center', va='top')

    # Bottom note
    pulse = FancyBboxPatch((2, 0.8), 6, 0.8,
                          boxstyle="round,pad=0.1",
                          facecolor='#95e1d3',
                          edgecolor='black', linewidth=2)
    ax.add_patch(pulse)
    ax.text(5, 1.2, 'Quarterly Pulse Check → All paths can escalate if situation changes',
            fontsize=10, fontweight='bold', ha='center', va='center')

    plt.tight_layout()
    plt.savefig('/Users/tomcassidy/thrive/thrive-work/architecture/diagrams/02-decision-tree.png',
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✓ Created decision tree")

def create_privacy_architecture():
    """Create privacy architecture diagram"""
    fig, ax = plt.subplots(figsize=(14, 7))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 7)
    ax.axis('off')

    # Title
    ax.text(7, 6.5, 'Privacy Architecture - Data Separation Model',
            fontsize=20, fontweight='bold', ha='center')

    # Employee view
    emp_box = FancyBboxPatch((0.5, 3), 3, 2.5,
                            boxstyle="round,pad=0.1",
                            facecolor='#4ecdc4',
                            edgecolor='black', linewidth=2)
    ax.add_patch(emp_box)
    ax.text(2, 5.1, 'EMPLOYEE VIEW', fontsize=12, fontweight='bold', ha='center')
    ax.text(2, 4.7, 'Full Access', fontsize=10, ha='center', style='italic')
    items = ['✓ All assessment responses', '✓ Complete OCEAN profile',
             '✓ Personal patterns', '✓ Home→Work details',
             '✓ Recommendations', '✓ Content usage', '✓ Full history']
    for i, item in enumerate(items):
        ax.text(2, 4.3-i*0.25, item, fontsize=8, ha='center')

    # Arrow to privacy boundary
    ax.arrow(3.5, 4.2, 1.5, 0, head_width=0.2, head_length=0.15,
            fc='black', ec='black', linewidth=3)

    # Privacy boundary
    boundary = FancyBboxPatch((5, 3.5), 2, 1.4,
                             boxstyle="round,pad=0.1",
                             facecolor='yellow',
                             edgecolor='red', linewidth=4)
    ax.add_patch(boundary)
    ax.text(6, 4.5, 'PRIVACY', fontsize=12, fontweight='bold', ha='center')
    ax.text(6, 4.1, 'BOUNDARY', fontsize=12, fontweight='bold', ha='center')
    ax.text(6, 3.8, 'K ≥ 10', fontsize=14, fontweight='bold', ha='center')

    # Arrow to employer
    ax.arrow(7, 4.2, 1.5, 0, head_width=0.2, head_length=0.15,
            fc='black', ec='black', linewidth=3)

    # Employer view
    emp_box = FancyBboxPatch((8.5, 3), 3, 2.5,
                            boxstyle="round,pad=0.1",
                            facecolor='#95e1d3',
                            edgecolor='black', linewidth=2)
    ax.add_patch(emp_box)
    ax.text(10, 5.1, 'EMPLOYER VIEW', fontsize=12, fontweight='bold', ha='center')
    ax.text(10, 4.7, 'Aggregated Only (k≥10)', fontsize=9, ha='center', style='italic')
    items = ['✓ Team OCEAN patterns %', '✓ Home→Work prevalence %',
             '✓ Engagement metrics', '✓ Quarterly trends']
    for i, item in enumerate(items):
        ax.text(10, 4.3-i*0.25, item, fontsize=8, ha='center')
    no_items = ['❌ NO Individual Data', '❌ NO Names/IDs', '❌ NO Personal Scores']
    for i, item in enumerate(no_items):
        ax.text(10, 3.4-i*0.2, item, fontsize=8, ha='center', color='red', fontweight='bold')

    # Clinical database (separate)
    clinical = FancyBboxPatch((4, 0.3), 4, 1.8,
                             boxstyle="round,pad=0.1",
                             facecolor='#ff6b6b',
                             edgecolor='black', linewidth=2)
    ax.add_patch(clinical)
    ax.text(6, 1.8, 'CLINICAL DATABASE (Separate)', fontsize=11, fontweight='bold', ha='center', color='white')
    ax.text(6, 1.5, 'Medical Privacy - Managed by Concierge Health', fontsize=8, ha='center', color='white')
    ax.text(6, 1.2, 'Patient + Provider Access Only', fontsize=8, ha='center', color='white')
    ax.text(6, 0.9, 'EMPLOYER: NO ACCESS', fontsize=9, ha='center', color='yellow', fontweight='bold')
    ax.text(6, 0.5, '✓ Patient records  ✓ Diagnoses  ✓ Treatments  ✓ Medications',
            fontsize=7, ha='center', color='white')

    # Dotted line showing separation
    ax.plot([2, 6], [2.8, 2.3], 'k--', linewidth=2, alpha=0.5)
    ax.text(4, 2.6, 'Separate\nSystem', fontsize=8, ha='center', style='italic')

    plt.tight_layout()
    plt.savefig('/Users/tomcassidy/thrive/thrive-work/architecture/diagrams/03-privacy-architecture.png',
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✓ Created privacy architecture")

def create_lego_status():
    """Create LEGO pieces status diagram"""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # Title
    ax.text(5, 9.5, 'LEGO Pieces Status - What We Have vs Need',
            fontsize=20, fontweight='bold', ha='center')

    y = 8.5

    # Complete
    ax.text(1, y, '✓ COMPLETE', fontsize=14, fontweight='bold', color='#4ecdc4')
    items = ['Cowch IMAGINE (JSON + Demo)', 'OCEAN Questions (196 scenarios)',
             'Privacy Architecture (Documented)', 'ClearMinds (91K users, proven)',
             'Partnerships (Dr Thomas, Goodbody)']
    y -= 0.5
    for item in items:
        box = FancyBboxPatch((1, y-0.25), 3.5, 0.4,
                            boxstyle="round,pad=0.05",
                            facecolor='#4ecdc4',
                            edgecolor='black', linewidth=1.5)
        ax.add_patch(box)
        ax.text(2.75, y, item, fontsize=9, ha='center', va='center', fontweight='bold')
        y -= 0.6

    y = 8.5

    # In Progress
    ax.text(5.5, y, '~ IN PROGRESS', fontsize=14, fontweight='bold', color='#ffa500')
    items = ['OCEAN Engine (436 uncommitted lines)',
             'Home→Work Logic (In analysis engine)',
             'Cowch Integration (Have IMAGINE schema)']
    y -= 0.5
    for item in items:
        box = FancyBboxPatch((5.5, y-0.25), 3.5, 0.4,
                            boxstyle="round,pad=0.05",
                            facecolor='#ffa500',
                            edgecolor='black', linewidth=1.5)
        ax.add_patch(box)
        ax.text(7.25, y, item, fontsize=9, ha='center', va='center',
                fontweight='bold', color='white')
        y -= 0.6

    y = 5

    # Not Started
    ax.text(1, y, '✗ NOT STARTED', fontsize=14, fontweight='bold', color='#ff6b6b')
    items = ['Neuroindicator (Need schema + demo)',
             'Employer Portal (Dashboard + enrollment)',
             'Employee Dashboard (Results + content access)',
             'Backend API (Database + privacy)',
             'Partner Integrations (APIs + booking systems)']
    y -= 0.5
    for item in items:
        box = FancyBboxPatch((1, y-0.25), 3.5, 0.4,
                            boxstyle="round,pad=0.05",
                            facecolor='#ff6b6b',
                            edgecolor='black', linewidth=1.5)
        ax.add_patch(box)
        ax.text(2.75, y, item, fontsize=9, ha='center', va='center',
                fontweight='bold', color='white')
        y -= 0.6

    y = 5

    # Undefined
    ax.text(5.5, y, '? UNDEFINED', fontsize=14, fontweight='bold', color='#95e1d3')
    items = ["Tom's 13 Framework (Need documentation)",
             'Jonathan Kemp (Scope TBD)',
             'Concierge Health (Formal structure)']
    y -= 0.5
    for item in items:
        box = FancyBboxPatch((5.5, y-0.25), 3.5, 0.4,
                            boxstyle="round,pad=0.05",
                            facecolor='#95e1d3',
                            edgecolor='black', linewidth=1.5)
        ax.add_patch(box)
        ax.text(7.25, y, item, fontsize=9, ha='center', va='center', fontweight='bold')
        y -= 0.6

    # Summary box
    summary = FancyBboxPatch((1, 0.5), 8, 1,
                            boxstyle="round,pad=0.1",
                            facecolor='#fff8e1',
                            edgecolor='#ffc107', linewidth=2)
    ax.add_patch(summary)
    ax.text(5, 1.2, 'Status Summary', fontsize=12, fontweight='bold', ha='center', color='#f57c00')
    ax.text(5, 0.75, '✓ Complete: 5 components  |  ~ In Progress: 3 components  |  ✗ Not Started: 5 components  |  ? Undefined: 3 components',
            fontsize=9, ha='center', va='center')

    plt.tight_layout()
    plt.savefig('/Users/tomcassidy/thrive/thrive-work/architecture/diagrams/04-lego-status.png',
                dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("✓ Created LEGO status")

if __name__ == '__main__':
    import os
    os.makedirs('/Users/tomcassidy/thrive/thrive-work/architecture/diagrams', exist_ok=True)

    print("Generating Thrive architecture diagrams...")
    create_platform_overview()
    create_decision_tree()
    create_privacy_architecture()
    create_lego_status()
    print("\n✓ All diagrams generated in architecture/diagrams/")
    print("  Images are 300 DPI, ready for presentations or PDF export")
